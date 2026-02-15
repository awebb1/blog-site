---
title: "Hello World"
date: 2026-02-13
excerpt: "Medium's CloudFlare WAF was blocking my CTF writeup. So here we are."
tags:
  - meta
  - coding
---

## The Problem with Medium

Not that I'm much of a blogger but if I want to do it I definitely don't want to jump through hoops. Medium is cool I guess. The editor is clean, my very few blogs got views. But yeah, I'm not fighting some stupid WAF to talk about CTFs and coding.

I write about penetration testing, CTF challenges, and code. Maybe I'll get into a groove with my own site now, maybe I won't lol.

## The Solution

This is a static site. Posts are just markdown files in a folder using 11ty to generate the site by hosting on Netlify. A little bit of JS and CSS for pretty factor.

```bash
# Write a post
editor

# Deploy (auto build via Netlify on push)
git add . && git commit -m "new post" && git push
```

That's it. The entire blog is generated at build time. The server only serves static HTML, CSS, and a few kilobytes of vanilla JS. No uploads. Nothing to exploit. And fast too.

## The Stack

- **Eleventy (11ty)** — Static site generator. Takes markdown, spits out HTML.
- **Prism.js** — Syntax highlighting for code blocks.
- **Netlify** — Hosts the built static files. Auto-deploys on git push.
- **Vanilla CSS** — Mainly because I never bothered to learn a framework.

## What I'll Write About

Mostly things that interest me:

- **Security** — Pentesting, CTF writeups, cert reviews.
- **Code** — Mostly Python, whatever language I'm vibe coding with. Really just whatever I decide to use for a given project.
- **Games** — Reviews, thoughts, the occasional "this game is good/bad/unfun" rant.
- **Projects** — If I worked on something neat. I'll share it with you.
- **AI** — The big wave baby. I've been getting into it myself. It helped me generate this site template and I've been learning to hack them in my free time.

If any of that sounds interesting, stick around. Nothing fancy. Just bookmark the page like it's 2005 or add me to your [RSS feed](https://alexdoesthings.dev/feed.xml)
