import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/Toaster";
import { UserNameForm } from "@/components/UserNameForm";
import { authOptions, getAuthSession } from "@/lib/auth";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function SettingsPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || "/sign-in");
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <Toaster></Toaster>
      <div className="grid items-start gap-8">
        <h1 className="font-bold text-3xl md:text-4xl">Settings</h1>

        <div className="grid gap-10">
          <UserNameForm
            user={{
              id: session.user.id,
              name: session.user.name || "",
            }}
          />
        </div>
      </div>
    </div>
  );
}
