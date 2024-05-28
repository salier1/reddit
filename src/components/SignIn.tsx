import { FC } from "react";
import { Icons } from "./Icons";
import Link from "next/link";
import UserAuthFrom from "./UserAuthFrom";

const SignIn: FC = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center items-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h6 w-6"></Icons.logo>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm max-w-xs mx-auto"> By continuing, you are setting up a Breadit account and agree to our User Agreement and Privacy Policy.</p>
        {/*  Sign in form */}

        <UserAuthFrom className=""></UserAuthFrom>

        <p className="px-8 text-center text-sm text-zinc-700">
          New to Breadit?{" "}
          <Link href={"/sign-up"} className="hover:text-zinc-800 text-sm underline underline-offset-4">
            signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
