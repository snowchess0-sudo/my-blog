import Link from "next/link";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "我的博客";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200/80 bg-background/80 backdrop-blur-md dark:border-zinc-800/80">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground hover:opacity-80"
        >
          {siteName}
        </Link>
        <nav className="text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/" className="hover:text-foreground">
            文章
          </Link>
        </nav>
      </div>
    </header>
  );
}
