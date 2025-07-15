"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";

export function Provider(props) {
  return (
    <ChakraProvider>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
