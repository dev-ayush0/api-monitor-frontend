import React, { useState, useEffect } from 'react';
import { Container, Title, Switch, Stack, TextInput, Button, Group, Text, Paper } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { fetchNotificationSettings, updateNotificationSettings } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    email_enabled: false,
    email_address: '',
    sms_enabled: false,
    phone_number: '',
    slack_enabled: false,
    slack_webhook: '',
  });

  useEffect(() => {
    const loadSettings = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const { data, error } = await fetchNotificationSettings();
        if (error) throw error;
        
        if (data) {
          setSettings({
            email_enabled: data.email_enabled || false,
            email_address: data.email_address || user.email || '',
            sms_enabled: data.sms_enabled || false,
            phone_number: data.phone_number || '',
            slack_enabled: data.slack_enabled || false,
            slack_webhook: data.slack_webhook || '',
          });
        } else {
          // Default to email notifications with user's email
          setSettings({
            ...settings,
            email_address: user.email || '',
          });
        }
      } catch (error) {
        console.error('Error loading notification settings:', error);
        showNotification({
          title: 'Error',
          message: 'Failed to load notification settings',
          color: 'red',
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadSettings();
  }, [user]);

  const handleToggle = (field) => {
    setSettings({
      ...settings,
      [field]: !settings[field],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const { error } = await updateNotificationSettings({
        ...settings,
        user_id: user.id,
      });
      
      if (error) throw error;
      
      showNotification({
        title: 'Success',
        message: 'Notification settings updated',
        color: 'green',
      });
    } catch (error) {
      console.error('Error saving notification settings:', error);
      showNotification({
        title: 'Error',
        message: 'Failed to save notification settings',
        color: 'red',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container size="sm" py="xl">
        <Text>Loading settings...</Text>
      </Container>
    );
  }

  return (
    <Container size="sm" py="xl">
      <Title order={2} mb="xl">Notification Settings</Title>
      
      <Paper withBorder p="md" mb="xl">
        <form onSubmit={handleSubmit}>
          <Stack spacing="lg">
            <Group position="apart">
              <Text weight={500}>Email Notifications</Text>
              <Switch 
                checked={settings.email_enabled}
                onChange={() => handleToggle('email_enabled')}
                label="Enable"
              />
            </Group>
            
            {settings.email_enabled && (
              <TextInput
                label="Email Address"
                name="email_address"
                placeholder="your@email.com"
                value={settings.email_address}
                onChange={handleInputChange}
                required={settings.email_enabled}
              />
            )}
            
            <Group position="apart" mt="md">
              <Text weight={500}>SMS Notifications</Text>
              <Switch 
                checked={settings.sms_enabled}
                onChange={() => handleToggle('sms_enabled')}
                label="Enable"
              />
            </Group>
            
            {settings.sms_enabled && (
              <TextInput
                label="Phone Number"
                name="phone_number"
                placeholder="+1 555 123 4567"
                value={settings.phone_number}
                onChange={handleInputChange}
                required={settings.sms_enabled}
              />
            )}
            
            <Group position="apart" mt="md">
              <Text weight={500}>Slack Notifications</Text>
              <Switch 
                checked={settings.slack_enabled}
                onChange={() => handleToggle('slack_enabled')}
                label="Enable"
              />
            </Group>
            
            {settings.slack_enabled && (
              <TextInput
                label="Slack Webhook URL"
                name="slack_webhook"
                placeholder="https://hooks.slack.com/services/..."
                value={settings.slack_webhook}
                onChange={handleInputChange}
                required={settings.slack_enabled}
              />
            )}
            
            <Group position="right" mt="xl">
              <Button type="submit" loading={saving}>
                Save Settings
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
      
      <Paper withBorder p="md">
        <Title order={4} mb="md">Alert Types</Title>
        <Text mb="xs">You will receive notifications for the following events:</Text>
        <ul>
          <li>When an API endpoint goes down</li>
          <li>When an API endpoint becomes slow (response time &gt; 2 seconds)</li>
          <li>When an API endpoint recovers from a down state</li>
        </ul>
      </Paper>
    </Container>
  );
};

export default Settings;