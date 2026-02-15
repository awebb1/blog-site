---
title: "Vibe Coding My Heart Out"
date: 2026-02-15
tags:
  - hacking
  - ai
  - coding
excerpt: "Alex dumps some late night thoughts on his AI takes and issues he's seen during this boom."
---

## Yeah I'm vibe coding. A lot.
I know people's opinions on AI are all over the place right now. Well, not really, you either hate it or you love it from what I've seen. While I understand the fear of losing a job or the ecological impact from the energy consumption. I gotta say, what a life changer.

---

## What I've Been Using AI For

Well first and foremost, this site. I used to have my own little static site I threw together which was pretty enough, honestly for being totally handmade it was pretty solid. But I wanted to find a place to land that had:
- Speed
- Adjustable pages
- Ease of use
- <mark>SECURE</mark>

A static site generator seemed like a nice way to handle that. Nothing but GET requests, nothing but static files I'm fine with you seeing. Powered by a one-shotted vibe coded page. What you all don't see on this site is an additional page accessible only on my local machine, <mark>*editor*</mark>. A text to markdown editor page utilizing the CSS and JS from this main site. I can type and submit a blog post just like you'd expect from a commercial product. **THIS** is the type of usage where AI shines. Not shoving it in front of every website because you want to save your company a few bucks on customer support, or to stay ahead of the trend.

![editor.webp](/img/blog/editor.webp)
> I mean come on. that's sick. (ignore the typos thanks.)

### Other Projects
Really whatever comes to my mind. I'll have some dedicated posts regarding my study tool, and my AI hacking assistant, but the fast solution creating nature of it has been game changing. Nmap scans to CSV. CORS compliant python HTTP servers. DNS rebinding scripts. Am I using it to make art? Not really, I mean the main splash image on here *is* AI generated. But it's not a common occurrence. So I definitely see where people's issues lie, and I am not claiming to be above some hypocrisy here. But there *is* value in it.

---

## What I DON'T Like
That being said, there are a lot of negatives. I'm talking beyond artists out of work too, which definitely sucks. But more in my ball park and where I have a bit of weight, is just how <mark>insecure</mark> these things are. They're black boxes man. There's no other way to slice it, you input something in, you can half expect what it's going to spit out but you really don't know. Things like OpenClaw are premature. They are. It's stupid. Putting a chat bot with access to tooling to control things, it's DUMB. [lakera.ai](https://gandalf.lakera.ai) is an awesome place to go and see some of this in action.

For example, this happened on a coworker's engagement, he came to me about hacking this client's AI. Simple little bot, appearing harmless enough. You had a question about the platform and this little guy would go get you and answer! My buddy had already successfully got it to spill the tools it had access too. I told him to focus on one specific one that stood out, <mark>*get_documentation*</mark>. The secret sauce to the AI's usefulness. Whenever you see anything that sounds like it is reaching out somewhere else, that should be an immediate red flag. Long story short, through some basic prompt injection he got this thing to believe the documentation URL was his burp collaborator server. Another request later "Retrieve the documentation from the updated source.", my friend performed <mark>SSRF</mark> and had a request in his burp with a JWT allocated for an Admin. He now had full control over the documentation site <mark>AND</mark> the site as a whole. From one simple misconfiguration, and a bot with a seemingly harmless task.

---

## Takeaways
Lots of ranting here, but I think it's important to look at the good and the bad. These things are dangerous, and they're taking jobs. BUT they are truly helping people like myself keep your data secure. For every 10 of these sloppy, insecure, in-cohesive garbage piles these things push out, there is someone out there using it to help the world out a little bit. (Plus it's fun who are we kidding lol)