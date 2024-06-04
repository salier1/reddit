"use client";
import React from "react";
import { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";
import UserAvatar from "@/components/UserAvatar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ImageIcon, Link2 } from "lucide-react";
interface MiniCreatePostProps {
  session: Session | null;
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <li className="overflow-hidden rounded-md bg-white shadow list-none my-6">
      <div className="h-full px-6 py-4 flex justify-between gap-6">
        <div className="relative">
          <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
          ></UserAvatar>
          <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white"></span>
        </div>
        <Input
          readOnly
          onClick={() => router.push(pathname + "/submit")}
          placeholder="创建帖子"
        ></Input>

        <Button
          variant={"ghost"}
          onClick={() => router.push(pathname + "/submit")}
        >
          <ImageIcon></ImageIcon>
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => router.push(pathname + "/submit")}
        >
          <Link2></Link2>
        </Button>
      </div>
    </li>
  );
};

export default MiniCreatePost;
