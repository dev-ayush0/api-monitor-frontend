import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import ApiList from '../components/dashboard/ApiList';
import AddApiModal from '../components/dashboard/AddApiModal';
import Button from '../components/common/Button';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      <h2>Dashboard</h2>
      <Button onClick={() => setShowModal(true)}>Add API</Button>
      <ApiList />
      {showModal && <AddApiModal onClose={() => setShowModal(false)} />}
    </Layout>
  );
};

export default Dashboard;