"use client";

import React, { startTransition } from "react";
import { FC } from "react";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { SubscribeToSubredditPayload } from "@/lib/validators/subreddit";
import axios, { AxiosError } from "axios";
import { useCustomToasts } from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface SubscriptLeaveToogleProps {
  subredditId: string;
  subredditName: string;
  isSubscribed: boolean;
}

const SubscriptLeaveToogle: FC<SubscriptLeaveToogleProps> = ({
  subredditId,
  subredditName,
  isSubscribed,
}) => {
  const { loginToast } = useCustomToasts();
  const router = useRouter();
  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      };
      const { data } = await axios.post("/api/subreddit/subscribe", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "有个问题",
        description: "出了点问题，请再试一次。",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
      return toast({
        title: "已订阅！",
        description: `您现在已订阅 r/${subredditName}`,
        color: "#3D522A",
      });
    },
  });
  const { mutate: unSubscribe, isLoading: isUnSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      };
      const { data } = await axios.post("/api/subreddit/unsubscribe", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "有个问题",
        description: "出了点问题，请再试一次。",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
      return toast({
        title: "取消订阅！",
        description: `您现在已取消订阅 r/${subredditName}`,
      });
    },
  });

  return isSubscribed ? (
    <Button
      isLoading={isUnSubLoading}
      onClick={() => unSubscribe()}
      className="w-full mt-1 mb-4"
    >
      离开社区
    </Button>
  ) : (
    <Button
      isLoading={isSubLoading}
      onClick={() => subscribe()}
      className="w-full mt-1 mb-4"
    >
      加入社区
    </Button>
  );
};

export default SubscriptLeaveToogle;
