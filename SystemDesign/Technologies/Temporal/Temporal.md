# What is Temporal
- Durable workflow orchestrator / Durable execution engine

# Install Temporal
- brew install temporal
- Use a docker image

# Temporal SDK in various languages
- Typescript, Dotnet, and Java.

# Temporal has a UI to see the progress.

# Components in temporal
- Temporal Server -- Schedules tasks and tracks timeouts
- History Database -- Stores append only workflow history
- Workflow workers -- Run workflow code
- Activity workers -- Execute external API calls
- Signals
- To handle updates temporal uses:
    - Versioning -- Logic applies only to new workflows.
    - Patching -- Logic applies to workflows in progress.
- How to make sure a step runs exactly once:
- How do we manage history size
    - keep activity input/output result small.
    - `Continue as new` - snapshot and handoff to a new workflow.

# Workflow and Activities
- workflow is the orchestrator
- Activities are the tasks
    - activites must be idempotent


# Questions
- What happens if retries exhausted for a workflow step, a user has to manually look into the logs, and can retry/other actions ?
- Idempotency
- How do you handle updates ?
- 