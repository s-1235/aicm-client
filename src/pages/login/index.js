import { useState } from 'react';
import { Box, Text, Input, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/logadmin', { email, password });
      console.log('Response is ----------->', response);

      if (response.status === 200) {
        // Successful login
        const { token, userId } = response.data;
        localStorage.setItem('token', token); // Store the token in local storage
        localStorage.setItem('userId', userId); // Store the userId in local storage
        setLoggedIn(true); // Set the loggedIn state to true

        // Redirect to the dashboard after successful login
        router.push('/dashboard');
      } else {
        // Login failed
        alert('Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <Box
      width="100%"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="#f0f0f0"
    >
      <Box
        backgroundColor="white"
        border="2px solid #d1d1d1"
        borderRadius="10px"
        padding="20px"
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
        maxWidth="400px"
        width="100%"
      >
        <Box
          background="linear-gradient(90deg, #0eb7f4, #05a0e9)"
          padding="8px 20px"
          borderRadius="8px"
          marginBottom="20px"
          textAlign="center"
        >
          <Text color="white" fontWeight="bold" fontSize="24px">
            AICM
          </Text>
        </Box>
        {!loggedIn ? (
          <>
            <Text
              fontSize="24px"
              fontWeight="bold"
              marginBottom="30px"
              textAlign="center"
              color="#0eb7f4"
            >
              Welcome Back! Please Login
            </Text>
            <Input
              type="email"
              fontSize="lg"
              size="lg"
              color="black"
              backgroundColor="white"
              height="48px"
              width="100%"
              borderRadius="15px"
              fontStyle="italic"
              paddingLeft="10px"
              marginBottom="20px"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Box position="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                fontSize="lg"
                size="lg"
                color="black"
                backgroundColor="white"
                height="48px"
                width="100%"
                borderRadius="15px"
                fontStyle="italic"
                paddingLeft="10px"
                paddingRight="40px"
                marginBottom="20px"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Box
                position="absolute"
                right="10px"
                top="50%"
                transform="translateY(-50%)"
                cursor="pointer"
              >
                <Text fontSize="18px" fontWeight="bold" cursor="pointer" onClick={togglePasswordVisibility}>
                  {showPassword ? '🙈' : '👀'}
                </Text>
              </Box>
            </Box>
            <Button
              variant="solid"
              color="white"
              backgroundColor="#0eb7f4"
              size="lg"
              height="48px"
              borderRadius="15px"
              fontSize="20px"
              fontStyle="italic"
              width="100%"
              onClick={handleLogin}
            >
              Login
            </Button>
          </>
        ) : (
          <Text
            fontSize="24px"
            fontWeight="bold"
            marginBottom="30px"
            textAlign="center"
            color="#0eb7f4"
          >
            Welcome! You are logged in.
          </Text>
        )}
      </Box>
    </Box>
  );
}
