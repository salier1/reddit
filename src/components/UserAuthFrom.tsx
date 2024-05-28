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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "There was a problem.",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button size={"sm"} className="w-full" onClick={loginWithGoogle} isLoading={isLoading}>
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2"></Icons.google>}
        Google
      </Button>
      <Button
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
      </Button>
      <Toaster></Toaster>
    </div>
  );
};

export default UserAuthFrom;
