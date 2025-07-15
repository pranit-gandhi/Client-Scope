import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  Input,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function CreateClientBase() {
  const [clientName, setClientName] = useState("");
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleUpload = async () => {
    if (!clientName.trim() || files.length === 0) return;

    const formData = new FormData();
    formData.append("clientName", clientName);
    files.forEach((file) => formData.append("files", file));

    setUploading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/create-client-base",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Upload successful", response.data);
      setClientName("");
      setFiles([]);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      bg="black"
      minH="100vh"
      pt="140px"
      pb={20}
      px={4}
      color="white"
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        bgGradient:
          "radial(circle at top left, rgba(208,74,2,0.12), transparent 60%)",
        zIndex: 0,
      }}
      style={{
        background: `
          linear-gradient(
            180deg,
            rgba(84, 0, 0, 1) 0%,
            rgba(16,16,16,1) 60%,
            rgba(0,0,0,1) 100%
          )
        `,
      }}
    >
      <Box
        position="relative"
        zIndex={1}
        maxW="900px"
        mx="auto"
        textAlign="center"
        p={8}
      >
        <Heading as="h2" size="2xl" mb={6} fontWeight="extrabold">
          Create Client Base
        </Heading>
        <Text
          color="var(--pwc-light-grey)"
          mb={14}
          fontSize="xl"
          maxW="650px"
          mx="auto"
        >
          Upload documents and build a new client knowledge base with ease.
        </Text>

        <Box mb={10} maxW="600px" mx="auto">
          <Input
            placeholder="Enter Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            size="lg"
            borderRadius="lg"
            bg="gray.800"
            color="white"
            _placeholder={{ color: "gray.500" }}
            border="1px solid rgba(255,182,0,0.2)"
            _focus={{
              borderColor: "var(--pwc-orange)",
              boxShadow: "0 0 0 1px var(--pwc-orange)",
            }}
            py={6}
            fontSize="lg"
          />
        </Box>

        <Box
          {...getRootProps()}
          border="1px solid rgba(255,182,0,0.2)"
          borderRadius="lg"
          p={16}
          cursor="pointer"
          bgGradient="linear(to-b, rgba(208,74,2,0.2), rgba(0,0,0,0.2))"
          _hover={{
            bgGradient:
              "linear(to-b, rgba(255,182,0,0.25), rgba(208,74,2,0.3))",
            borderColor: "rgba(255,182,0,0.3)",
          }}
          transition="all 0.3s"
          maxW="700px"
          minH="340px"
          mx="auto"
          mb={10}
          lineHeight={10}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Text color="white" fontSize="lg">
              Drop the files here...
            </Text>
          ) : (
            <Text color="gray.300" fontSize="lg">
              Drag & drop files here, or click to select
            </Text>
          )}
        </Box>

        {files.length > 0 && (
          <VStack spacing={3} mt={8} maxW="600px" mx="auto">
            {files.map((file) => (
              <Box
                key={file.name}
                bg="rgba(255,182,0,0.08)"
                border="1px solid rgba(255,182,0,0.1)"
                w="100%"
                px={4}
                py={3}
                borderRadius="md"
                color="white"
                textAlign="left"
                fontSize="md"
                _hover={{
                  bg: "rgba(255,182,0,0.15)",
                }}
              >
                {file.name}
              </Box>
            ))}
          </VStack>
        )}

        <Button
          onClick={handleUpload}
          mt={12}
          size="lg"
          fontWeight="600"
          borderRadius="lg"
          px={12}
          py={7}
          fontSize="lg"
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
            filter: "brightness(1.15)",
          }}
          _active={{
            transform: "scale(0.97)",
            boxShadow: "0 0 8px rgba(255,182,0,0.3)",
          }}
          isLoading={uploading}
          loadingText="Creating"
          disabled={!clientName.trim() || files.length === 0}
          transition="all 0.3s ease"
        >
          Create Client Base
        </Button>
      </Box>
    </Box>
  );
}
