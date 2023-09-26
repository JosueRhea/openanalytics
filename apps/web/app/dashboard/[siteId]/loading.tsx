import { Box, Heading } from "@radix-ui/themes";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Loading = ({ children }: Props) => {
  return (
    <Box>
      <Heading size="9">loading</Heading>
      {children}
    </Box>
  );
};

export default Loading;
