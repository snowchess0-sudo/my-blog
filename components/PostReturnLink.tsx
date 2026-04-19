'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function PostReturnLink() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  
  const returnUrl = from === 'categories' ? '/categories' : '/';
  const returnText = from === 'categories' ? '← 返回分类' : '← 返回所有文章';

  return (
    <Link
      href={returnUrl}
      className="mt-4 inline-block text-sm text-zinc-600 hover:text-foreground dark:text-zinc-400"
    >
      {returnText}
    </Link>
  );
}
