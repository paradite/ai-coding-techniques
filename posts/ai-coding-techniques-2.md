In this post, we will analyze the effectiveness of AI coding techniques using tools and agents.

This is part 2 of the series on AI coding techniques. Check out [part 1](https://thegroundtruth.substack.com/p/effectiveness-of-ai-coding-techniques-input-context), where I analyzed techniques for input and context management.

## 1. Tool Calls

Mature. Effective.

Tool calls were the magic that kick-started the AI coding agent era. Tools (function calling) were [first introduced](https://openai.com/index/function-calling-and-other-api-updates/) by OpenAI in June 2023 for `gpt-4-0613` and `gpt-3.5-turbo-0613` (Yes, GPT-4 was released two years ago). Cursor popularized tool calling for file editing inside its IDE.

![OpenAI function calling](./ai-coding-techniques-2/openai-function-calling.png)

This marked the shift from the manual ChatGPT copy-pasting workflow to **agentic workflow**, where AI agents equipped with tools can carry out code edits and execute CLI commands autonomously, without needing human developers' help to interact with the local environment.

Newer models like Kimi K2 are specifically trained to take advantage of tool calls and be agentic by default, which helps with complex coding tasks involving multiple steps and the use of tools.

![Kimi K2](./ai-coding-techniques-2/kimi-k2.png)

Tool calls are now a foundational piece for any AI coding tool, as they have proven to be a very effective way for models to interact with the external environment.

## 2. MCP Servers

Emerging. Limited Effectiveness.

Taking the idea of tools a step further, we get Model Context Protocol (MCP). MCP was [introduced by Anthropic](https://www.anthropic.com/news/model-context-protocol) in November 2024 as a way to standardize communication between AI agents and other external services.

![MCP](./ai-coding-techniques-2/mcp.png)

Despite being out for almost a year, it has not gained widespread usage, based on community feedback from Reddit and X. The protocol itself is still undergoing [iterations of changes](https://modelcontextprotocol.io/specification/2025-06-18/changelog) to allow [better authorization flow](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization) and [security](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices).

One issue limiting the effectiveness of MCP servers is the **static nature of tools**. The MCP protocol itself does not allow for selective or dynamic enabling of tools within an MCP server. If an MCP server has 20 tools, the definitions of all 20 tools will be added to the beginning of the model's context window. With 5 MCP servers and 20 tools each, that's 100 tools.

This is a problem for models with a [limited effective context window](https://thegroundtruth.substack.com/p/the-ground-truth-weekly-effective):

- The more tokens already present in the context, the less effective the model becomes at solving tasks.
- Having a large number of tools can distract the model; it might use tools when not necessary, or choose a less effective tool.
- A large number of tool definitions [take up context window](https://www.reddit.com/r/ClaudeAI/comments/1mjieaf/claude_code_context_and_mcps/) and reduce the amount of usable context for the user.
- Having tool definitions in the context also increases cost, as the full tool definitions are resent to the model for each message.

There are workarounds for the "explosion of tools" problem. Some MCP client apps, like Cursor, allow you to selectively enable tools, and you can fork open-source MCP servers to remove tools that are not needed. However, these are workarounds that do not address the underlying issue.

Nonetheless, when used sparingly, MCP servers can be useful in specific situations. For example, the Playwright MCP server can help debug frontend visual issues. The key to getting the most out of MCP is to be **selective and strategic** about the MCP servers and tools you enable, instead of just enabling all of them.

## 3. AST / Codemap

Emerging. Effective.

Abstract Syntax Trees (ASTs) and code maps are advanced techniques for AI agents to understand the codebase. Instead of using RAG or embeddings to generate a vector database, agents leverage tools like [tree-sitter](https://tree-sitter.github.io/tree-sitter/) to parse the code and generate an accurate high-level representation of the code (a code map).

![RepoPrompt Codemap](./ai-coding-techniques-2/repoprompt-codemap.png)

ASTs and code maps give the agent a concise overview of the codebase. This technique has a few advantages over alternative tools:

- The output is accurate and free from hallucinations and errors, because the AST parsing logic is deterministic and mirrors how the code is actually read by a compiler.
- A code map is more token-efficient compared to raw string-based search using tools like `grep`, as it hides implementation details and retains only high-level symbols and control flow.
- A code map is more cost-effective than RAG, as it does not involve embeddings or vector stores.

To the best of our knowledge, Cline [uses tree-sitter](https://github.com/cline/cline/blob/8fbccff8538cde243ceb08d644a15dbf2256b544/src/services/tree-sitter/index.ts) for parsing code and file search. RepoPrompt also parses the code and generates a [code map](https://origo.prose.sh/code-maps) to help the model understand the codebase.

We are not aware of other tools that employ this technique, and such features are unlikely to be exposed to end users to tune or modify.

## 4. Parallel Agents

Emerging. Effective.

Parallel agents were first popularized by remote AI coding platforms like Devin, where for each task, you spin up a new agent in an isolated instance. If you give multiple tasks, you get agents running in parallel by default.

![Devin Parallel Agents](./ai-coding-techniques-2/devin-parallel agents.png)

This technique recently became available in Cursor as [background agents](https://docs.cursor.com/en/background-agent). Claude Code also supports this via its [GitHub Actions integration](https://docs.anthropic.com/en/docs/claude-code/github-actions).

It is a little bit harder to set up parallel agents locally on a single project. Claude Code [recommends](https://www.anthropic.com/engineering/claude-code-best-practices) creating multiple Git checkouts in separate folders or using Git worktrees to set up parallel agents for the same project.

Personally, I have not needed to run them in parallel often, as I have multiple projects that I switch between while the agent is working. However, this technique closely mirrors the real-world software development setting, where a team of engineers work on different tasks separately in parallel, so there are no obvious issues or limitations with the technique.

Given the right tools and workflows, remote agents should be able to complete the entire task in isolation and submit a PR as a way to coordinate code merges, making it no less effective than running a single agent.

## 5. Sub-Agents

Emerging. Limited Effectiveness.

Sub-agents are not to be confused with parallel agents. With sub-agents, we are talking about agents that are spawned by another agent, instead of by humans.

The first real-world sub-agent was also introduced in September 2024 by Devin as a feature called [MultiDevin](https://docs.devin.ai/release-notes/overview#september-3%2C-2024), where one Devin acts as a "manager" to distribute work to "worker" Devins.

![Multi-Devin](./ai-coding-techniques-2/multidevin.png)

However, this feature seems to have been removed from the Devin documentation. There is an interesting [blog post](https://cognition.ai/blog/dont-build-multi-agents) from Cognition (Devin) on principles for building agents that touches on sub-agents and why you should not build multi-agent systems.

Sub-agents have become more popular as a [feature](https://docs.anthropic.com/en/docs/claude-code/sub-agents) inside Claude Code, where the sub-agent receives instructions from the main agent and has its own context window separate from the main context. This helps keep the main context window focused on the main task and not cluttered with sub-tasks.

Based on my personal experience with Claude Code sub-agents for gathering context, they are quite slow in completing tasks. They often have to start from scratch and miss the context that was already present in the main agent, probably because not all context from the main agent is passed to the sub-agent. It is best to think of them as a trade-off where you sacrifice speed to preserve the main context window.

I did find sub-agents useful for making specialized and reusable workflows, i.e., **custom agents**. For example, I have a sub-agent configured to perform releases, which involves gathering the changes, updating the version number, and writing release notes. It is a good way of encapsulating prompts and steps for accomplishing a repetitive task and making it reusable.

![Changelog Version Updater](./ai-coding-techniques-2/changelog-version-updater.png)
