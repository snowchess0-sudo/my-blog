import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          文章
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          共 {posts.length} 篇，内容由 Markdown 生成。
        </p>
      </header>
      <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {posts.map((post) => {
          const formatted = new Intl.DateTimeFormat("zh-CN", {
            dateStyle: "medium",
          }).format(new Date(post.date));
          return (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="group block py-6 first:pt-0 hover:opacity-90"
              >
                <h2 className="text-lg font-medium text-foreground group-hover:underline">
                  {post.title}
                </h2>
                {post.description ? (
                  <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {post.description}
                  </p>
                ) : null}
                <time
                  dateTime={post.date}
                  className="mt-2 block text-xs text-zinc-500 dark:text-zinc-500"
                >
                  {formatted}
                </time>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
