# SQL Server Storage Engine pages

Self-contained interactive pages about how SQL Server stores and reads B+ tree indexes. Each page is one HTML file with inline CSS and JavaScript. The only external resources are Google Fonts.

| File | What it is |
|---|---|
| `index.html` | Landing page linking the five pages |
| `inside-an-8kb-page.html` | To-scale byte map of a clustered leaf page and a nonclustered leaf page, with inserts, deletes, compaction, page splits and record anatomy |
| `key-lookup-walkthrough.html` | Step-through of `SELECT * FROM t WHERE secondary_id = 4` as an Index Seek plus Key Lookup, with a cost model for the scan tipping point |
| `lock-walkthrough.html` | Step-through of six locking stories (S/X, U, intent locks, isolation levels, a blocking chain, a deadlock) with the lock manager, a wait-for graph and DMV rows side by side |
| `storage-engine-drill.html` | Twelve-level game where you execute statements by hand, plus the Peak Load arcade mode |
| `page-runner.html` | 2D platformer where each room is one index page, scored in logical reads |

## Storage Engine Drill levels

1. Seeks and lookups
2. INCLUDE and filtered indexes
3. Ranges and composite keys
4. ORDER BY and TOP
5. Writes (INSERT, UPDATE, DELETE, page splits, ghost records)
6. Heaps (RID lookups, table scans, forwarded records)
7. Statistics (histogram estimates, combining predicates)
8. Plan reuse (parameter sniffing, stale statistics)
9. Index design (one index for a workload, scored against the best possible design)
10. Joins (nested loops, merge join, hash match)
11. Locks (lock modes and compatibility, the wait queue, intent locks, how long each isolation level holds locks, lock escalation)
12. Blocking and isolation (head blockers, RCSI, SNAPSHOT and SERIALIZABLE, deadlocks)

Several levels also deal **Spot the bug** rounds: read an actual execution plan, flag the operator causing the problem, and choose the fix. The eight bugs are a key lookup storm, stale statistics, parameter sniffing, a spilling Sort, an implicit conversion, a function on an indexed column, a heavy residual predicate, and a scan inside a nested loop.

**Peak Load** is a real-time arcade mode: keep a server under 60,000 reads a second through six waves of traffic by building and dropping indexes, refreshing statistics, adding OPTION (RECOMPILE), killing rogue sessions and breaking blocking chains. The Stock take wave brings escalated table locks: KILL the head blocker rather than its waiters, switch on READ_COMMITTED_SNAPSHOT between waves, and index created_at so the purge stops escalating. It has a tutorial, streaks, badges, an overtime mode and a generative melody driven by the statements reaching the server.

Scenarios are generated randomly each time, and each round uses one of six schemas (the original `t`/`u`, orders, books, tickets, tracks or sensor readings) with the same table shapes under different names. Level progress, Peak Load scores, badges and sound settings are stored in the browser's `localStorage`.

The trees are miniatures with a few rows per page so they fit on screen. Costs and estimates in the text are scaled to a 2,000,000-row table with 20,000 clustered leaf pages.

## Page Runner levels

Each room is one 8 KB page. Non-leaf rows are pedestals showing a separator key and child page number; drop through a trapdoor to read that child, or climb the ladder to the parent. Leaf rows are gems in slot order, and the side doors are `m_prevPage` and `m_nextPage`. Every room entered is one logical read, scored against the engine's read count for the statement.

1. Find the row (clustered index seek)
2. Range walk (BETWEEN across the leaf chain, stopping only after a key past the range)
3. Key lookup (nonclustered seek, then a clustered descent per match)
4. Backwards (`TOP (3) ORDER BY id DESC` through `m_prevPage`)
5. Page split (insert into a full leaf)
6. The archive (explore a four-level tree for eight scrolls)
7. Deadlock (lock two rows while another session locks the same two; the order decides whether you wait or deadlock)

Levels 1 to 5 each hide a scroll off the optimal path, so collecting it costs reads. Scrolls fill a codex of storage-engine facts kept in `localStorage`.
