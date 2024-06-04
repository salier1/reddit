import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import CustomFeed from "@/components/homepage/CustomFeed";
import GeneralFeed from "@/components/homepage/GeneralFeed";
export default async function Home() {
  const session = await getAuthSession();
  return (
    <div>
      <h1 className="font-bold text-3xl md:text-4xl">你的帖子</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/* feed */}
        {/* @ts-expect-error server components */}
        {session ? <CustomFeed></CustomFeed> : <GeneralFeed></GeneralFeed>}

        {/*  subreddit info */}
        <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
          <div className="bg-emerald-100 px-6 py-4">
            <p className="font-semibold py-3 flex items-center gap-1.5">
              <HomeIcon className="w-4 h-4"></HomeIcon>
              主页
            </p>
          </div>

          <div className="-my-3 divide-y divide-gray-100  px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <p className="text-zinc-500">
                您的个人Breadit主页。来这里查看你的最喜欢的社区！
              </p>
            </div>

            <Link
              className={buttonVariants({
                className: "w-full mt-4 mb-6",
              })}
              href={"/r/create"}
            >
              创建社区
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
