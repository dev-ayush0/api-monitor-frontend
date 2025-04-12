import React, { useState } from 'react';
import { 
  TextInput, 
  PasswordInput, 
  Button, 
  Group, 
  Box, 
  Title, 
  Text, 
  Container, 
  Paper, 
  Anchor, 
  Divider 
} from '@mantine/core';
import { signIn, signUp, resetPassword } from '../lib/supabase';
import { showNotification } from '@mantine/notifications';

export const SignIn = ({ onToggleAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
    } catch (error) {
      showNotification({
        title: 'Error',
        message: error.message || 'Failed to sign in',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <Title order={2} align="center" mb="md">
        Welcome Back
      </Title>
      
      <form onSubmit={handleSubmit}>
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb="md"
        />
        
        <PasswordInput
          required
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb="md"
        />
        
        <Group position="apart" mt="md">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => onToggleAuth('reset')}
            size="sm"
          >
            Forgot password?
          </Anchor>
        </Group>
        
        <Button fullWidth mt="xl" type="submit" loading={loading}>
          Sign in
        </Button>
      </form>
      
      <Text align="center" mt="md">
        Don't have an account?{' '}
        <Anchor onClick={() => onToggleAuth('signup')}>
          Create one
        </Anchor>
      </Text>
    </Box>
  );
};

export const SignUp = ({ onToggleAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signUp(email, password);
      if (error) throw error;
      
      showNotification({
        title: 'Success',
        message: 'Check your email for the confirmation link',
        color: 'green',
      });
      
      onToggleAuth('signin');
    } catch (error) {
      showNotification({
        title: 'Error',
        message: error.message || 'Failed to sign up',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <Title order={2} align="center" mb="md">
        Create an Account
      </Title>
      
      <form onSubmit={handleSubmit}>
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb="md"
        />
        
        <PasswordInput
          required
          label="Password"
          placeholder="Create a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb="md"
        />
        
        <Button fullWidth mt="xl" type="submit" loading={loading}>
          Sign up
        </Button>
      </form>
      
      <Text align="center" mt="md">
        Already have an account?{' '}
        <Anchor onClick={() => onToggleAuth('signin')}>
          Sign in
        </Anchor>
      </Text>
    </Box>
  );
};

export const ForgotPassword = ({ onToggleAuth }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await resetPassword(email);
      if (error) throw error;
      
      setSent(true);
    } catch (error) {
      showNotification({
        title: 'Error',
        message: error.message || 'Failed to send reset instructions',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <Title order={2} align="center" mb="md">
        Reset your password
      </Title>
      
      {sent ? (
        <>
          <Text align="center" mb="md">
            We've sent a password reset link to your email.
          </Text>
          <Button fullWidth onClick={() => onToggleAuth('signin')}>
            Back to sign in
          </Button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextInput
            required
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb="md"
          />
          
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Send reset instructions
          </Button>
          
          <Text align="center" mt="md">
            <Anchor onClick={() => onToggleAuth('signin')}>
              Back to sign in
            </Anchor>
          </Text>
        </form>
      )}
    </Box>
  );
};

export const AuthPage = () => {
  const [authMode, setAuthMode] = useState('signin');

  return (
    <Container size="xs" py="xl">
      <Paper radius="md" p="xl" withBorder>
        {authMode === 'signin' && <SignIn onToggleAuth={setAuthMode} />}
        {authMode === 'signup' && <SignUp onToggleAuth={setAuthMode} />}
        {authMode === 'reset' && <ForgotPassword onToggleAuth={setAuthMode} />}
      </Paper>
    </Container>
  );
};