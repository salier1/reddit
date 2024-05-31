"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";
import { FC } from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default Providers;
