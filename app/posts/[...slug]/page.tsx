import type { Metadata } from "next";
export const dynamic = "force-dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostMarkdown } from "@/components/PostMarkdown";
import { PostReturnLink } from "@/components/PostReturnLink";
import { getPostBySegments, getPostSegmentPaths } from "@/lib/posts";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return getPostSegmentPaths().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySegments(slug);
  if (!post) return { title: "未找到文章" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySegments(slug);
  if (!post) notFound();

  const formattedDate = new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "long",
  }).format(new Date(post.date));

  const folderTrail = slug.length > 1 ? slug.slice(0, -1).join(" / ") : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav className="text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-foreground">
          首页
        </Link>
        {" · "}
        <Link href="/categories" className="hover:text-foreground">
          分类
        </Link>
        {folderTrail ? (
          <>
            {" · "}
            <span className="text-zinc-600 dark:text-zinc-500">{folderTrail}</span>
          </>
        ) : null}
      </nav>
      <PostReturnLink />
      <header className="mt-8">
        <div className="border-t border-b border-zinc-200 py-8 dark:border-zinc-800">
          <h1 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
        </div>
        <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">{formattedDate}</p>
        {post.tags && post.tags.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>
      <div className="mt-10">
        <PostMarkdown content={post.content} />
      </div>
    </article>
  );
}
