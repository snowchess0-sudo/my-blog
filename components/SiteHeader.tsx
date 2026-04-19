import Link from "next/link";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "塞尔达是天";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200/80 bg-background/60 backdrop-blur-md dark:border-zinc-800/80">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-foreground hover:opacity-90">
          {siteName}
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/" className="hover:text-foreground">
            所有文章
          </Link>
          <Link href="/categories" className="hover:text-foreground">
            分类文章
          </Link>
        </nav>
      </div>
    </header>
  );
}
