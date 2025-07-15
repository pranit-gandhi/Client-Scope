import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      console.log("Missing fields");
      return;
    }

    console.log("Logging in with:", email, password);
    navigate("/dashboard");
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      px={4}
      py={10}
      minH="100vh"
      bg="black"
    >
      <Box
        bg="gray.800"
        p={8}
        borderRadius="md"
        boxShadow="lg"
        w="100%"
        maxW="400px"
        textAlign="center"
      >
        <Heading as="h2" size="lg" mb={6} color="white">
          Log In
        </Heading>

        <Stack spacing={4}>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="filled"
            bg="gray.700"
            color="white"
            _placeholder={{ color: "gray.400" }}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
            bg="gray.700"
            color="white"
            _placeholder={{ color: "gray.400" }}
          />
          <Button colorScheme="orange" onClick={handleLogin} fontWeight="600">
            Log In
          </Button>
        </Stack>

        <Text mt={4} color="gray.400" fontSize="sm">
          Don’t have an account? (You can implement Sign Up later)
        </Text>
      </Box>
    </Flex>
  );
}
