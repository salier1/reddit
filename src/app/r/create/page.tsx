"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CreateSubredditPayload } from "@/lib/validators/subreddit";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/Toaster";
import { useCustomToasts } from "@/hooks/use-custom-toast";
export default function Page() {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const { loginToast } = useCustomToasts();
  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = { name: input };
      const { data } = await axios.post("/api/subreddit", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Subreddit already exist",
            description: "Please choose a different subreddit name.",
            variant: "destructive",
          });
        }
        if (err.response?.status === 401) {
          return loginToast();
        }
        if (err.response?.status === 422) {
          return toast({
            title: "Subreddit name invalid",
            description: "Please choose a name between 3 and 21 characters.",
            variant: "destructive",
          });
        }

        return toast({
          title: "There was an error",
          description: "Could not create subreddit.",
          variant: "destructive",
        });
      }
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`);
    },
  });
  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <Toaster></Toaster>
      <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create a community</h1>
        </div>

        <hr className="bg-z-500 h-px" />

        <div>
          <p className="text-lg font-medium">Name</p>
          <p className="text-xs pb-2">
            Community names including capitalization can not be changed.
          </p>

          <div className="relative">
            <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400">
              r/
            </p>
            <Input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              className="pl-5"
            ></Input>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button onClick={() => router.back()}>Cancel</Button>
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => {
              createCommunity();
            }}
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  );
}
