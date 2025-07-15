import { Flex, Box, Button, Image, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      px={6}
      py={4}
      position="fixed"
      top="0"
      left="0"
      width="100%"
      zIndex="1000"
      backdropFilter="blur(8px)"
      borderBottom="1px solid rgba(255,255,255,0.08)"
    >
      <Flex align="center">
        <Image src="/pwc.svg" alt="PwC Logo" h="48px" mr={3} />
        <Box
          fontWeight="bold"
          fontSize="xl"
          color="white"
          letterSpacing="0.5px"
        >
          ClientScope
        </Box>
      </Flex>

      <Spacer />

      <Box>
        <Link to="/contact">
          <Button
            size="md"
            fontWeight="600"
            borderRadius="lg"
            px={8}
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
              filter: "brightness(1.2)",
            }}
            _active={{
              transform: "scale(0.97)",
              boxShadow: "0 0 8px rgba(255,182,0,0.3)",
            }}
            transition="all 0.3s ease"
          >
            Contact
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}
