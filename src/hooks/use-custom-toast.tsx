import { buttonVariants } from "@/components/ui/Button";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

export const useCustomToasts = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: "需要登录。",
      description: "登录以继续",
      variant: "destructive",
      action: (
        <Link
          onClick={() => dismiss()}
          href="/sign-in"
          className={buttonVariants({ variant: "outline" })}
        >
          登录
        </Link>
      ),
    });
  };

  return { loginToast };
};
