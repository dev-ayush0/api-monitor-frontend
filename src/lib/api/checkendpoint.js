// /api/check-endpoints.js
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req, res) {
  // This should be secured in production
  if (req.method !== 'POST' || req.headers['x-api-key'] !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Get all API endpoints
    const { data: endpoints, error } = await supabase
      .from('api_endpoints')
      .select('*');

    if (error) throw error;

    // Check each endpoint
    const results = await Promise.all(
      endpoints.map(async (endpoint) => {
        try {
          const startTime = Date.now();
          const response = await axios.get(endpoint.url, {
            timeout: 10000, // 10 second timeout
          });
          const endTime = Date.now();
          const responseTime = (endTime - startTime) / 1000; // in seconds
          
          let status = 'up';
          if (responseTime > 5) {
            status = 'slow';
          }
          
          // Update the endpoint status
          await supabase
            .from('api_endpoints')
            .update({
              status,
              response_time: responseTime,
              last_checked: new Date().toISOString(),
            })
            .eq('id', endpoint.id);
          
          // Check if we need to send notifications
          if (endpoint.status !== status && (status === 'down' || status === 'slow' || 
              (status === 'up' && endpoint.status === 'down'))) {
            // Fetch user's notification settings
            const { data: settings } = await supabase
              .from('notification_settings')
              .select('*')
              .eq('user_id', endpoint.user_id)
              .single();
            
            if (settings) {
              await sendNotifications(settings, endpoint, status);
            }
          }
          
          return {
            id: endpoint.id,
            url: endpoint.url,
            status,
            responseTime,
          };
        } catch (error) {
          // API is down
          await supabase
            .from('api_endpoints')
            .update({
              status: 'down',
              last_checked: new Date().toISOString(),
            })
            .eq('id', endpoint.id);
          
          // Check if we need to send notifications
          if (endpoint.status !== 'down') {
            // Fetch user's notification settings
            const { data: settings } = await supabase
              .from('notification_settings')
              .select('*')
              .eq('user_id', endpoint.user_id)
              .single();
            
            if (settings) {
              await sendNotifications(settings, endpoint, 'down');
            }
          }
          
          return {
            id: endpoint.id,
            url: endpoint.url,
            status: 'down',
            error: error.message,
          };
        }
      })
    );

    return res.status(200).json({ success: true, results });
  } catch (error) {
    console.error('Error checking endpoints:', error);
    return res.status(500).json({ error: error.message });
  }
}

async function sendNotifications(settings, endpoint, status) {
  const apiName = endpoint.name || endpoint.url;
  const statusText = status === 'up' ? 'is now working' : 
                    status === 'slow' ? 'is responding slowly' : 
                    'is down';
  const message = `Alert: ${apiName} ${statusText} as of ${new Date().toLocaleString()}`;
  
  try {
    // Send email notification
    if (settings.email_enabled && settings.email_address) {
      // Here you would integrate with your email provider (SendGrid, Mailgun, etc.)
      console.log(`Sending email to ${settings.email_address}: ${message}`);
    }
    
    // Send SMS notification
    if (settings.sms_enabled && settings.phone_number) {
      // Here you would integrate with an SMS provider like Twilio
      console.log(`Sending SMS to ${settings.phone_number}: ${message}`);
    }
    
    // Send Slack notification
    if (settings.slack_enabled && settings.slack_webhook) {
      try {
        await axios.post(settings.slack_webhook, {
          text: message,
        });
      } catch (error) {
        console.error('Error sending Slack notification:', error);
      }
    }
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
}
