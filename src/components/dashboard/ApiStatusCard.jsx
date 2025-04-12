import React from 'react';
import { Card, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import { formatDistanceToNow } from 'date-fns';

const StatusIndicator = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case 'up':
        return 'green';
      case 'slow':
        return 'yellow';
      case 'down':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getText = () => {
    switch (status) {
      case 'up':
        return 'All Good';
      case 'slow':
        return 'Slow';
      case 'down':
        return 'Down';
      default:
        return 'Unknown';
    }
  };

  return (
    <Badge color={getColor()} size="lg" radius="sm">
      {getText()}
    </Badge>
  );
};

const ApiStatusCard = ({ api, onDelete, onEdit }) => {
  const getStatusMessage = () => {
    const name = api.name || 'Your API';
    
    switch (api.status) {
      case 'up':
        return `${name} is working fine`;
      case 'slow':
        return `${name} is responding slowly`;
      case 'down':
        return `${name} is currently down`;
      default:
        return `${name} status is unknown`;
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
      <Group position="apart" mb="xs">
        <Text weight={500}>{api.name || 'Unnamed API'}</Text>
        <StatusIndicator status={api.status} />
      </Group>
      
      <Text size="sm" color="dimmed" mb="md">
        {api.url}
      </Text>
      
      <Text mb="xs">{getStatusMessage()}</Text>
      
      <Group position="apart" mt="md">
        <Text size="xs" color="dimmed">
          Last checked: {
            api.last_checked 
              ? formatDistanceToNow(new Date(api.last_checked), { addSuffix: true })
              : 'Never'
          }
        </Text>
        
        <Group spacing="xs">
          <Button size="xs" variant="outline" onClick={() => onEdit(api)}>
            Edit
          </Button>
          <Button size="xs" color="red" variant="outline" onClick={() => onDelete(api.id)}>
            Remove
          </Button>
        </Group>
      </Group>
    </Card>
  );
};

export default ApiStatusCard;
