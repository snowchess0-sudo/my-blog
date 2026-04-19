import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

/** 每次请求读磁盘，避免静态页在错误 cwd 下被固化成「0 篇」；本地改 Markdown 后刷新即可。 */
export const dynamic = "force-dynamic";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <h1 className="section-title">所有文章</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">All posts.</p>
      </header>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/posts/${post.slug}?from=all`}
              className="group block rounded-lg border border-zinc-100 bg-white/60 px-4 py-3 shadow-sm transition hover:shadow-md hover:translate-y-0.5 dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <div className="flex items-center gap-3">
                <span className="shrink-0 select-none text-lg leading-snug text-zinc-400 dark:text-zinc-500" aria-hidden>
                  •
                </span>
                <span className="min-w-0 text-lg font-medium text-foreground group-hover:underline">{post.title}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
