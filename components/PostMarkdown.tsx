import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";

type Props = {
  content: string;
};

export function PostMarkdown({ content }: Props) {
  return (
    <article className="prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-zinc-900 prose-a:underline-offset-4 hover:prose-a:text-zinc-600 dark:prose-a:text-zinc-100 dark:hover:prose-a:text-zinc-300 prose-pre:bg-zinc-900 prose-pre:text-zinc-100 dark:prose-pre:bg-zinc-950 card-content site-card">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
