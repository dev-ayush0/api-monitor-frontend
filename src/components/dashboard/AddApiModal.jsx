import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import Button from '../common/Button';

const AddApiModal = ({ onClose }) => {
  const [url, setUrl] = useState('');
  const { addEndpoint } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEndpoint(url);
    setUrl('');
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add API Endpoint</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="https://api.example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Button type="submit">Add</Button>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddApiModal;