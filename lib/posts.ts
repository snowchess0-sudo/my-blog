import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
};

export type Post = PostMeta & {
  slug: string;
  content: string;
};

function parseFrontmatter(raw: string, slug: string): Post | null {
  const { data, content } = matter(raw);
  const title = data.title;
  const date = data.date;
  if (typeof title !== "string" || typeof date !== "string") return null;
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

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  return parseFrontmatter(raw, slug);
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
