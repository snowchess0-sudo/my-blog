import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: process.env.NEXT_PUBLIC_SITE_NAME ?? "我的博客",
    template: `%s · ${process.env.NEXT_PUBLIC_SITE_NAME ?? "我的博客"}`,
  },
  description: "基于 Next.js 与 Markdown 的个人博客",
  openGraph: {
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">{children}</div>
        </main>
        <footer className="border-t border-zinc-200 py-8 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
          <p>Powered by Next.js</p>
        </footer>
      </body>
    </html>
  );
}
