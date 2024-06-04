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
            title: "该社区已经存在",
            description: "请选择不同的社区名称。",
            variant: "destructive",
          });
        }
        if (err.response?.status === 401) {
          return loginToast();
        }
        if (err.response?.status === 422) {
          return toast({
            title: "社区名称无效",
            description: "请在3到21个字符之间选择一个名字。",
            variant: "destructive",
          });
        }

        return toast({
          title: "有一个错误",
          description: "无法创建subreddit。",
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
          <h1 className="text-xl font-semibold">创建一个社区</h1>
        </div>

        <hr className="bg-z-500 h-px" />

        <div>
          <p className="text-lg font-medium">名称</p>
          <p className="text-xs pb-2">包括大写在内的社区名称不能更改。</p>

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
          <Button onClick={() => router.back()}>取消</Button>
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => {
              createCommunity();
            }}
          >
            创建社区
          </Button>
        </div>
      </div>
    </div>
  );
}
