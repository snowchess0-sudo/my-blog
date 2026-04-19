---
title: Next.js 推到 Vercel 的常见流程
date: 2026-04-15
description: 从本地 commit 到线上可访问，顺带记一下环境变量与域名。
tags:
  - Next.js
  - Vercel
---

1. 代码进 GitHub：`git add` → `git commit` → `git push`  
2. Vercel 项目绑定同一仓库，推送后自动构建  
3. 生产环境建议配置 `NEXT_PUBLIC_SITE_URL` 为你的自定义域名（含 `https://`）

构建失败时，优先看 Vercel 里 **Build Logs** 的报错行，再回到本地 `npm run build` 复现。
