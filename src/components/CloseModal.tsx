"use client";

import React from "react";
import { Button } from "./ui/Button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
const CloseModal = () => {
  const router = useRouter();
  return (
    <Button variant={"ghost"} aria-label="close modal" className="h-6 w-6 p-0 rounded-md" onClick={() => router.back()}>
      <X className="h-4 w-4"></X>
    </Button>
  );
};

export default CloseModal;
