# Important notes on logger
- loglevels with order: DEBUG < INFO < WARN < ERROR < FATAL
- logformatter: JSON to file, plain text to console.
- logSink: FileLogSink, ConsoleLogSink.
- the Actual LogRecord: level, message, timestamp.
- Logger class derived classes file, console, etc.
- Logger class properties:
    - minLogLevel
    - Logformatter
    - LogSink
- Logger Service
    - Set<Logger>

- concurrent writes to a logger must be handled.


# Extensibility
- Queue
    - Overflow policy.
    - Worker thread polling the queue.

- Add `Map<string, object> context` field on Logger to add pass new data like requestId,UserId, etc.