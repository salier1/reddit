import { Editor } from "@/components/Editor";
import { Button, buttonVariants } from "@/components/ui/Button";
import { db } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface pageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: pageProps) => {
  const subreddit = await db.subreddit.findFirst({
    where: {
      name: params.slug,
    },
  });

  if (!subreddit) return notFound();

  return (
    <div className="flex flex-col items-start gap-6">
      <Link
        href={`/r/${params.slug}`}
        className={buttonVariants({ variant: "ghost" })}
      >
        返回
      </Link>
      {/* heading */}
      <div className="border-b border-gray-200 pb-5">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
            发布帖子
          </h3>
          <p className="ml-2 mt-1 truncate text-sm text-gray-500">
            于 r/{params.slug}
          </p>
        </div>
      </div>

      {/* form */}
      <Editor subredditId={subreddit.id} />

      <div className="w-full flex justify-end">
        <Button type="submit" className="w-full" form="subreddit-post-form">
          发布
        </Button>
      </div>
    </div>
  );
};

export default page;
