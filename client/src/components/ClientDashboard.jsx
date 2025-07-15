import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Spinner,
  SimpleGrid,
  Badge,
  VStack,
  HStack,
  Icon,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiFileText, FiArrowLeft, FiBarChart2 } from "react-icons/fi";

export default function ClientDashboard() {
  const { id } = useParams();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientFiles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/client/${id}/files`
        );
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching client files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientFiles();
  }, [id]);

  const getProgressValue = (value) => {
    if (!value) return 0;
    const val = value.toLowerCase();
    if (val.includes("high")) return 90;
    if (val.includes("medium")) return 60;
    if (val.includes("low")) return 30;
    return 50;
  };

  return (
    <Box
      bg="black"
      minH="100vh"
      pt="100px"
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
        bgGradient="linear(to-r, white, #af7e57ff, #c01347ff)"
        bgClip="text"
        sx={{
          backgroundSize: "40%", // Make the gradient stretch wider
          backgroundPosition: "center",
        }}
      >
        Client Dashboard
      </Heading>

      <Text textAlign="center" color="gray.400" mb={10} fontSize="lg">
        Viewing detailed insights for <strong>{id}</strong>
      </Text>

      {loading ? (
        <Flex justify="center" mt={20}>
          <Spinner size="xl" thickness="4px" color="orange.400" />
        </Flex>
      ) : files.length === 0 ? (
        <Text textAlign="center" color="gray.500" mt={12}>
          No files found for this client.
        </Text>
      ) : (
        <VStack spacing={12} maxW="1600px" mx="auto" w="full">
          {files.map((file) => (
            <Box
              key={file.id}
              bgGradient="linear(to-br, gray.800, gray.700)"
              border="1px solid"
              borderColor="gray.700"
              borderRadius="xl"
              p={10}
              w="100%"
              maxW="1400px"
              boxShadow="2xl"
              transition="all 0.3s"
              _hover={{
                boxShadow: "3xl",
                transform: "translateY(-3px)",
              }}
            >
              <HStack mb={6} spacing={4}>
                <Icon as={FiFileText} boxSize={7} color="orange.400" />
                <Heading as="h3" size="lg" fontWeight="bold" color="white">
                  {file.file_name}
                </Heading>
              </HStack>

              {file.summary_json ? (
                <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                  {Object.entries(file.summary_json).map(
                    ([key, value], index) => (
                      <Box
                        key={key}
                        bg="gray.900"
                        borderRadius="md"
                        p={6}
                        border="1px solid"
                        borderColor="gray.700"
                      >
                        {index % 3 === 0 ? (
                          <Stat>
                            <StatLabel
                              color="gray.400"
                              fontSize="sm"
                              textTransform="capitalize"
                            >
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </StatLabel>
                            <StatNumber fontSize="lg" color="orange.300">
                              {typeof value === "string" ||
                              typeof value === "number"
                                ? value
                                : JSON.stringify(value)}
                            </StatNumber>
                            <StatHelpText>
                              <Icon as={FiBarChart2} mr={1} />
                              Insight
                            </StatHelpText>
                          </Stat>
                        ) : index % 3 === 1 ? (
                          <>
                            <Text
                              fontSize="sm"
                              color="gray.400"
                              mb={2}
                              textTransform="capitalize"
                            >
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </Text>
                            <Progress
                              value={getProgressValue(value)}
                              size="sm"
                              colorScheme="orange"
                              borderRadius="md"
                            />
                            <Text fontSize="xs" color="gray.500" mt={2}>
                              {typeof value === "string"
                                ? value
                                : JSON.stringify(value)}
                            </Text>
                          </>
                        ) : (
                          <>
                            <Text
                              fontSize="sm"
                              color="gray.400"
                              mb={2}
                              textTransform="capitalize"
                            >
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </Text>
                            <Badge
                              bg="orange.500"
                              color="white"
                              fontSize="0.9em"
                              px={2}
                              py={1}
                              borderRadius="md"
                            >
                              {typeof value === "string"
                                ? value
                                : JSON.stringify(value)}
                            </Badge>
                          </>
                        )}
                      </Box>
                    )
                  )}
                </SimpleGrid>
              ) : (
                <Text color="gray.500" mt={4}>
                  No summary available.
                </Text>
              )}

              <Flex justify="flex-end" mt={8}>
                <Button
                  as="a"
                  href={file.public_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="md"
                  fontWeight="600"
                  borderRadius="md"
                  px={6}
                  py={4}
                  color="white"
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
                  leftIcon={<FiFileText />}
                >
                  View Original File
                </Button>
              </Flex>
            </Box>
          ))}
        </VStack>
      )}

      <Flex justify="center" mt={12}>
        <Button
          onClick={() => window.history.back()}
          size="md"
          fontWeight="600"
          borderRadius="md"
          px={8}
          py={4}
          color="white"
          style={{
            background: `
      linear-gradient(
        135deg,
        rgba(255,182,0,0.2) 0%,
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
        rgba(255,182,0,0.3) 0%,
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
          leftIcon={<FiArrowLeft />}
        >
          Back to Client List
        </Button>
      </Flex>
    </Box>
  );
}
