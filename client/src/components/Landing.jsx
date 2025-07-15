import { useNavigate } from "react-router-dom";
import { Flex, Heading, Text, Button, Box } from "@chakra-ui/react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      px={4}
      textAlign="center"
      style={{
        background: `
    linear-gradient(
      180deg,
      rgba(97, 36, 4, 1) 0%,
      rgba(16,16,16,1) 60%,
      rgba(0,0,0,1) 100%
    )
  `,
      }}
    >
      <Box maxW="800px" mx="auto">
        <Heading
          as="h1"
          fontSize={["2.5rem", "3rem", "4rem"]}
          fontWeight="extrabold"
          mb={4}
          color="rgba(220,220,220,0.9)"
          lineHeight="1.2"
          opacity="0"
          animation="fadeIn 1s ease forwards"
        >
          Welcome to ClientScope
        </Heading>

        <Text
          fontSize={["lg", "xl"]}
          style={{ color: "rgba(125,125,125,1)" }}
          mb={10}
          lineHeight="1.6"
          opacity="0"
          animation="fadeIn 1s ease forwards"
          animationDelay="0.3s"
        >
          Analyze client documents with AI-powered insights. <br />
          Elevate your consulting process to the next level.
        </Text>

        <Button
          onClick={() => navigate("/dashboard")}
          size="lg"
          fontWeight="600"
          borderRadius="lg"
          px={10}
          py={6}
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
        >
          Embrace the Future
        </Button>
      </Box>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Flex>
  );
}
