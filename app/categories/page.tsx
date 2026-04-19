import Link from "next/link";
import { buildPostTrie, getCategorizedPosts, type PostTrieNode } from "@/lib/posts";

export const dynamic = "force-dynamic";

/** 多级分类树：有子级时用 `<details>`，初始折叠，只露出当前层「根」名称；文章只链 frontmatter 标题。 */
function CategoryBranch({
  segment,
  node,
  pathPrefix,
}: {
  segment: string;
  node: PostTrieNode;
  pathPrefix: string[];
}) {
  const segs = [...pathPrefix, segment];
  const href = `/posts/${segs.join("/")}`;
  const childEntries = Array.from(node.children.entries()).sort(([a], [b]) =>
    a.localeCompare(b, "zh-CN"),
  );

  if (childEntries.length === 0) {
    if (!node.post) return null;
    return (
      <li className="py-1">
        <Link href={`${href}?from=categories`} className="text-foreground hover:underline">
          {node.post.title}
        </Link>
      </li>
    );
  }

  return (
    <li className="py-0.5">
      <details className="rounded-md open:bg-zinc-50 dark:open:bg-zinc-900/50">
        <summary className="cursor-pointer py-1.5 font-medium text-zinc-800 marker:text-zinc-400 dark:text-zinc-200 dark:marker:text-zinc-500">
          {segment}
        </summary>
        <div className="ml-3 border-l border-zinc-200 pl-3 dark:border-zinc-800">
          {node.post ? (
            <div className="pt-1 pb-2">
              <Link href={`${href}?from=categories`} className="text-sm text-foreground underline-offset-2 hover:underline">
                {node.post.title}
              </Link>
              <span className="ml-2 text-xs text-zinc-500">（此目录同名文章）</span>
            </div>
          ) : null}
          <ul className="space-y-0.5 pb-2">
            {childEntries.map(([name, child]) => (
              <CategoryBranch key={`${segs.join("/")}/${name}`} segment={name} node={child} pathPrefix={segs} />
            ))}
          </ul>
        </div>
      </details>
    </li>
  );
}

export default function CategoriesPage() {
  const trie = buildPostTrie(getCategorizedPosts());
  const roots = Array.from(trie.children.entries()).sort(([a], [b]) => a.localeCompare(b, "zh-CN"));

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <h1 className="section-title">分类文章</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">Categorized posts.</p>
      </header>
      {roots.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">暂无已分类文章。</p>
      ) : (
        <ul className="space-y-1">
          {roots.map(([name, child]) => (
            <CategoryBranch key={name} segment={name} node={child} pathPrefix={[]} />
          ))}
        </ul>
      )}
    </div>
  );
}
