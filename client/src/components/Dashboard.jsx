import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  const metrics = {
    totalClients: 42,
    approved: 18,
    underReview: 15,
    declined: 9,
    industries: 6,
    revenueGenerated: "$3.2M",
  };

  const topIndustriesAccepted = ["Healthcare", "Fintech", "Retail"];
  const topIndustriesDeclined = ["Crypto", "Fashion", "Unverified Startups"];
  const promisingCompanies = ["Salesforce", "Anthropic", "Vercel"];

  return (
    <Box
      bg="black"
      minH="100vh"
      pt="120px"
      pb={16}
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
      rgba(77, 29, 4, 1) 20%,
      rgba(16,16,16,1) 60%,
      rgba(0,0,0,1) 100%
    )
  `,
      }}
    >
      <Box position="relative" zIndex={1}>
        <Heading
          as="h2"
          size="xl"
          mb={4}
          textAlign="center"
          fontWeight="extrabold"
        >
          Your Consulting Dashboard
        </Heading>
        <Text
          textAlign="center"
          color="var(--pwc-light-grey)"
          mb={12}
          fontSize="lg"
        >
          Empowering decisions with clear, AI-powered insights.
        </Text>

        {/* Metric cards */}
        <SimpleGrid
          columns={[1, 2, 3]}
          spacing={8}
          maxW="1200px"
          mx="auto"
          mb={16}
        >
          <MetricCard label="Knowledge Bases" value={metrics.totalClients} />
          <MetricCard label="Approved Clients" value={metrics.approved} />
          <MetricCard label="Under Review" value={metrics.underReview} />
          <MetricCard label="Declined Clients" value={metrics.declined} />
          <MetricCard label="Industries Covered" value={metrics.industries} />
          <MetricCard
            label="Revenue Generated"
            value={metrics.revenueGenerated}
          />
        </SimpleGrid>

        {/* Progress bars */}
        <SimpleGrid
          columns={[1, 2]}
          spacing={8}
          maxW="1000px"
          mx="auto"
          mb={16}
        >
          <ProgressCard
            title="Approval Rate"
            percent={(metrics.approved / metrics.totalClients) * 100}
          />
          <ProgressCard
            title="Review Pipeline"
            percent={(metrics.underReview / metrics.totalClients) * 100}
          />
        </SimpleGrid>

        {/* List cards */}
        <SimpleGrid
          columns={[1, 2, 3]}
          spacing={8}
          maxW="1200px"
          mx="auto"
          mb={16}
        >
          <ListCard
            title="Top Industries Accepted"
            items={topIndustriesAccepted}
          />
          <ListCard
            title="Top Industries Declined"
            items={topIndustriesDeclined}
          />
          <ListCard
            title="Companies with Most Promise"
            items={promisingCompanies}
          />
        </SimpleGrid>

        {/* CTA */}
        <Flex justify="center" gap={6} wrap="wrap">
          <Button
            onClick={() => navigate("/client-bases")}
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
            Select Client Portfolio
          </Button>
          <Button
            onClick={() => navigate("/create-client-base")}
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
              filter: "brightness(1.15)",
            }}
            _active={{
              transform: "scale(0.97)",
              boxShadow: "0 0 8px rgba(255,182,0,0.3)",
            }}
            transition="all 0.3s ease"
          >
            Add New Client
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export function MetricCard({ label, value }) {
  const isNumber = typeof value === "number";
  const [displayValue, setDisplayValue] = useState(isNumber ? 0 : value);

  useEffect(() => {
    if (!isNumber) return;

    let start = 0;
    const end = value;
    const duration = 1000;
    const increment = end / (duration / 16);
    let current = start;

    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(interval);
      }
      setDisplayValue(Math.floor(current));
    }, 16);

    return () => clearInterval(interval);
  }, [value, isNumber]);

  return (
    <Box
      bgGradient="linear(to-b, rgba(208,74,2,0.2), rgba(0,0,0,0.2))"
      border="1px solid rgba(255,182,0,0.15)"
      borderRadius="lg"
      p={8}
      textAlign="center"
      boxShadow="lg"
      mx="auto"
      w="80%"
      mb={6}
      _hover={{
        bgGradient: "linear(to-b, rgba(255,182,0,0.25), rgba(208,74,2,0.3))",
        transform: "translateY(-6px) scale(1.02)",
        boxShadow: "0 0 20px rgba(255,182,0,0.3)",
      }}
      transition="all 0.3s ease"
    >
      <Text color="var(--pwc-light-grey)" fontSize="sm" mb={3}>
        {label}
      </Text>
      <Text fontSize="3xl" fontWeight="bold" color="var(--pwc-yellow)">
        {isNumber ? displayValue : value}
      </Text>
    </Box>
  );
}

function ProgressCard({ title, percent }) {
  return (
    <Box
      bgGradient="linear(to-b, rgba(208,74,2,0.15), rgba(0,0,0,0.15))"
      border="1px solid rgba(255,182,0,0.1)"
      borderRadius="lg"
      p={8}
      boxShadow="lg"
      textAlign="center"
      mx="auto"
      w="90%"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-6px)",
        boxShadow: "0 0 20px rgba(255,182,0,0.3)",
      }}
    >
      <Text color="var(--pwc-light-grey)" mb={4} fontSize="sm">
        {title}
      </Text>
      <Box
        w="100%"
        bg="rgba(255,182,0,0.1)"
        borderRadius="full"
        overflow="hidden"
        h="14px"
        mb={4}
      >
        <Box
          bg="var(--pwc-orange)"
          h="14px"
          width={`${percent}%`}
          transition="width 0.4s ease"
        />
      </Box>
      <Text fontSize="sm" color="var(--pwc-yellow)">
        {percent.toFixed(0)}% Complete
      </Text>
    </Box>
  );
}

function ListCard({ title, items }) {
  return (
    <Box
      bgGradient="linear(to-b, rgba(208,74,2,0.2), rgba(0,0,0,0.2))"
      border="1px solid rgba(255,182,0,0.1)"
      borderRadius="lg"
      p={8}
      boxShadow="lg"
      textAlign="left"
      mx="auto"
      w="90%"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-6px)",
        boxShadow: "0 0 20px rgba(255,182,0,0.3)",
      }}
    >
      <Text color="var(--pwc-light-grey)" fontSize="sm" mb={4}>
        {title}
      </Text>
      <VStack spacing={2} align="stretch">
        {items.map((item, index) => (
          <Box
            key={index}
            bg="rgba(255,182,0,0.08)"
            border="1px solid rgba(255,182,0,0.1)"
            borderRadius="md"
            px={4}
            py={2}
            fontSize="sm"
            _hover={{
              bg: "rgba(255,182,0,0.15)",
            }}
          >
            {item}
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
