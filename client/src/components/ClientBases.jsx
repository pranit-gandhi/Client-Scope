import { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Spinner,
  SimpleGrid,
  Button,
  Icon,
  Badge,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiFolder, FiArrowRight } from "react-icons/fi";

export default function ClientBases() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/clients");
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <Box
      bg="black"
      minH="100vh"
      pt="120px"
      pb={16}
      px={4}
      color="white"
      style={{
        background: `
      linear-gradient(
        180deg,
        rgba(0,0,0,1) 0%,
        rgba(16,16,16,1) 60%,
        rgba(97,36,4,1) 100%
      )
    `,
      }}
    >
      <Heading
        as="h2"
        size="2xl"
        mb={3}
        textAlign="center"
        fontWeight="extrabold"
        bgGradient="linear(to-r, white, #af7e57, #c01347)"
        bgClip="text"
        sx={{
          backgroundSize: "40%",
          backgroundPosition: "center",
        }}
      >
        Our Clients
      </Heading>
      <Text textAlign="center" color="gray.400" mb={12} fontSize="lg">
        Explore the knowledge bases we maintain for our valued clients.
      </Text>

      {loading ? (
        <Flex justify="center" mt={20}>
          <Spinner size="xl" thickness="4px" color="orange.400" />
        </Flex>
      ) : clients.length === 0 ? (
        <Text textAlign="center" color="gray.500" mt={12}>
          No clients found.
        </Text>
      ) : (
        <SimpleGrid
          columns={[1, 2]}
          spacing={10}
          maxW="1400px"
          mx="auto"
          w="full"
        >
          {clients.map((client) => (
            <Box
              key={client.id}
              bgGradient="linear(to-br, gray.800, gray.700)"
              border="1px solid"
              borderColor="gray.700"
              borderRadius="xl"
              p={8}
              transition="all 0.3s ease"
              boxShadow="xl"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "2xl",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/client/${client.id}`)}
            >
              <VStack align="start" spacing={5}>
                <Flex align="center">
                  <Icon as={FiFolder} boxSize={7} color="orange.300" mr={2} />
                  <Text fontSize="2xl" fontWeight="bold">
                    {client.name}
                  </Text>
                </Flex>

                {client.description && (
                  <Text fontSize="md" color="gray.400" noOfLines={3}>
                    {client.description}
                  </Text>
                )}

                {client.created_at && (
                  <Badge
                    bg="orange.500"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="md"
                    fontSize="sm"
                  >
                    Created: {new Date(client.created_at).toLocaleDateString()}
                  </Badge>
                )}

                <Button
                  size="md"
                  fontWeight="600"
                  borderRadius="md"
                  px={6}
                  py={4}
                  color="white"
                  alignSelf="stretch"
                  style={{
                    background: `
            linear-gradient(
              135deg,
              rgba(255,182,0,0.25) 0%,
              rgba(208,74,2,0.3) 50%,
              rgba(224,48,30,0.3) 100%
            )
          `,
                    border: "1px solid rgba(255,182,0,0.3)",
                    boxShadow: "0 0 12px rgba(255,182,0,0.2)",
                    backdropFilter: "blur(4px)",
                  }}
                  _hover={{
                    background: `
            linear-gradient(
              135deg,
              rgba(255,182,0,0.35) 0%,
              rgba(208,74,2,0.4) 50%,
              rgba(224,48,30,0.4) 100%
            )
          `,
                    transform: "translateY(-3px)",
                    boxShadow: "0 0 20px rgba(255,182,0,0.4)",
                    filter: "brightness(1.25)",
                  }}
                  _active={{
                    transform: "scale(0.97)",
                    boxShadow: "0 0 8px rgba(255,182,0,0.3)",
                  }}
                  transition="all 0.3s ease"
                  rightIcon={<FiArrowRight />}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/client/${client.id}`);
                  }}
                >
                  View Knowledge Base
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
