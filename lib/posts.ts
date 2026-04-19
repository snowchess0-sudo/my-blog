import fs from "fs";
import path from "path";
import matter from "gray-matter";

/** 从当前工作目录向上查找 `content/posts`。 */
function getPostsDirectory(): string {
  let dir = process.cwd();
  for (let i = 0; i < 15; i++) {
    const candidate = path.join(dir, "content", "posts");
    try {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
        return candidate;
      }
    } catch {
      /* ignore */
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return path.join(process.cwd(), "content", "posts");
}

export type PostMeta = {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
};

/** `slug` 为 URL 段，用 `/` 连接，如 `笔记/前端/标题`（对应文件 `content/posts/笔记/前端/标题.md`）。 */
export type Post = PostMeta & {
  slug: string;
  content: string;
};

export type PostTrieNode = {
  post: Post | null;
  children: Map<string, PostTrieNode>;
};

/** 递归收集 `postsRoot` 下所有 `.md`，返回相对路径段（不含 `.md`）。 */
function collectMarkdownSegmentPaths(postsRoot: string, out: string[][]): void {
  if (!fs.existsSync(postsRoot)) return;
  const walk = (dir: string) => {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        walk(full);
      } else if (ent.isFile() && ent.name.endsWith(".md")) {
        const rel = path.relative(postsRoot, full);
        const noExt = rel.slice(0, -3);
        const segments = noExt.split(path.sep).filter(Boolean);
        if (segments.length) out.push(segments);
      }
    }
  };
  walk(postsRoot);
}

/** 用于 `generateStaticParams`：每个元素是一条路径段数组。 */
export function getPostSegmentPaths(): string[][] {
  const root = getPostsDirectory();
  const paths: string[][] = [];
  collectMarkdownSegmentPaths(root, paths);
  const key = (s: string[]) => s.join("\0");
  const seen = new Set<string>();
  return paths.filter((p) => {
    const k = key(p);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function normalizeFrontmatterDate(value: unknown): string | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }
  return null;
}

function parseFrontmatter(raw: string, slug: string): Post | null {
  const { data, content } = matter(raw);
  const title = data.title;
  const date = normalizeFrontmatterDate(data.date);
  if (typeof title !== "string" || !date) return null;
  return {
    slug,
    title,
    date,
    description: typeof data.description === "string" ? data.description : undefined,
    tags: Array.isArray(data.tags)
      ? data.tags.filter((t): t is string => typeof t === "string")
      : undefined,
    content,
  };
}

export function getPostBySegments(segments: string[]): Post | null {
  if (!segments.length) return null;
  const postsDirectory = getPostsDirectory();
  
  // Decode URL-encoded segments (for Chinese/special characters in file paths)
  const decodedSegments = segments.map(seg => {
    try {
      return decodeURIComponent(seg);
    } catch {
      return seg;
    }
  });
  
  const rel = path.join(...decodedSegments) + ".md";
  const fullPath = path.join(postsDirectory, rel);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  const slug = segments.join("/");
  return parseFrontmatter(raw, slug);
}

/** `slug` 为 `a/b/c` 形式，与 URL `/posts/a/b/c` 一致。 */
export function getPostBySlug(slug: string): Post | null {
  const segments = slug.split("/").filter(Boolean);
  return getPostBySegments(segments);
}

export function getAllPosts(): Post[] {
  return getPostSegmentPaths()
    .map((segments) => getPostBySegments(segments))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

/** 位于 `content/posts` 某子目录下的文章（根目录单文件不算「已分类」）。 */
export function getCategorizedPosts(): Post[] {
  return getAllPosts().filter((p) => p.slug.includes("/"));
}

export function buildPostTrie(posts: Post[]): PostTrieNode {
  const root: PostTrieNode = { post: null, children: new Map() };
  for (const post of posts) {
    const parts = post.slug.split("/").filter(Boolean);
    let node = root;
    for (const part of parts) {
      if (!node.children.has(part)) {
        node.children.set(part, { post: null, children: new Map() });
      }
      node = node.children.get(part)!;
    }
    node.post = post;
  }
  return root;
}
