---
title: 欢迎来到博客
date: 2026-04-18
description: 站点已就绪，这是一篇示例文章，可按同样格式在 content/posts 下添加 Markdown。
tags:
  - 站务
---

本站使用 **Next.js** 与 Markdown 文件驱动。把新文章放在 `content/posts` 目录，文件名即 URL 路径（例如 `my-post.md` 对应 `/posts/my-post`）。

## 你可以写什么

- 技术笔记与教程
- 读书笔记
- 任意你想公开的内容

## 代码示例

```ts
export function greet(name: string) {
  return `Hello, ${name}`;
}
```

部署后若已绑定域名，请在环境变量中设置 `NEXT_PUBLIC_SITE_URL` 为完整站点地址（含 `https://`），以便生成正确的 Open Graph 等元数据。
