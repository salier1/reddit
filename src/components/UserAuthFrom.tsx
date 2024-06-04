"use client";
import { FC, useState } from "react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { Icons } from "./Icons";
import { Toaster } from "./ui/Toaster";
import { useToast } from "@/hooks/use-toast";
interface UserAuthFromProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthFrom: FC<UserAuthFromProps> = ({ className, ...props }) => {
  const { toast } = useToast();
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false);
  const [isLoadingGithub, setIsLoadingGithub] = useState<boolean>(false);
  const loginWithGoogle = async () => {
    setIsLoadingGoogle(true);
    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "有一个问题。",
        description: "使用谷歌登录时出错",
        variant: "destructive",
      });
    } finally {
      setIsLoadingGoogle(false);
    }
  };
  const loginWithGithub = async () => {
    setIsLoadingGithub(true);
    try {
      await signIn("github");
    } catch (error) {
      toast({
        title: "有一个问题。",
        description: "使用Github登录时出错",
        variant: "destructive",
      });
    } finally {
      setIsLoadingGithub(false);
    }
  };
  return (
    <div
      className={cn("flex flex-col justify-center gap-1", className)}
      {...props}
    >
      <Button
        size={"sm"}
        className="w-full"
        onClick={loginWithGoogle}
        isLoading={isLoadingGoogle}
      >
        {isLoadingGoogle ? null : (
          <Icons.google className="h-4 w-4 mr-2"></Icons.google>
        )}
        Google
      </Button>
      <Button
        size={"sm"}
        className="w-full"
        onClick={loginWithGithub}
        isLoading={isLoadingGithub}
      >
        {isLoadingGithub ? null : (
          <Icons.github className="h-4 w-4 mr-2"></Icons.github>
        )}
        Github
      </Button>
      {/* <Button
        size={"sm"}
        className="w-full"
        onClick={() =>
          toast({
            title: "There was a problem.",
            description: "There was an error logging in with Google",
            variant: "destructive",
          })
        }>
        toast
      </Button> */}
      <Toaster></Toaster>
    </div>
  );
};

export default UserAuthFrom;
