import MiniCreatePost from "@/components/MiniCreatePost";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

interface pageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: pageProps) => {
  const { slug } = params;
  const session = await getAuthSession();

  const subreddit = await db.subreddit.findFirst({
    where: {
      name: slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
      },
    },
  });

  return (
    <div>
      <h1 className="font-bold text-3xl md:text-4xl h-14">{subreddit?.name}</h1>
      <MiniCreatePost session={session}></MiniCreatePost>
    </div>
  );
};

export default Page;