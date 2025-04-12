import React from 'react';
import Layout from '../components/layout/Layout';
import NotificationSettings from '../components/dashboard/NotificationSettings';

const Settings = () => {
  return (
    <Layout>
      <h2>Settings</h2>
      <NotificationSettings />
    </Layout>
  );
};

export default Settings;