import React from 'react';
import Button from '../common/Button';

const NotificationSettings = () => {
  // TODO: Add form for email/SMS/Slack settings
  return (
    <div className="notification-settings">
      <h2>Notification Settings</h2>
      <p>Configure how you receive alerts (coming soon).</p>
      <Button disabled>Save Settings</Button>
    </div>
  );
};

export default NotificationSettings;