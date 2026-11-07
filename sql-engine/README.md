# SQL Server Storage Engine pages

Self-contained interactive pages about how SQL Server stores and reads B+ tree indexes. Each page is one HTML file with inline CSS and JavaScript. The only external resources are Google Fonts.

| File | What it is |
|---|---|
| `index.html` | Landing page linking the three pages |
| `inside-an-8kb-page.html` | To-scale byte map of a clustered leaf page and a nonclustered leaf page, with inserts, deletes, compaction, page splits and record anatomy |
| `key-lookup-walkthrough.html` | Step-through of `SELECT * FROM t WHERE secondary_id = 4` as an Index Seek plus Key Lookup, with a cost model for the scan tipping point |
| `storage-engine-drill.html` | Ten-level game where you execute statements by hand, plus the Peak Load arcade mode |

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

Several levels also deal **Spot the bug** rounds: read an actual execution plan, flag the operator causing the problem, and choose the fix. The eight bugs are a key lookup storm, stale statistics, parameter sniffing, a spilling Sort, an implicit conversion, a function on an indexed column, a heavy residual predicate, and a scan inside a nested loop.

**Peak Load** is a real-time arcade mode: keep a server under 60,000 reads a second through five waves of traffic by building and dropping indexes, refreshing statistics, adding OPTION (RECOMPILE) and killing rogue sessions. It has a tutorial, streaks, badges, an overtime mode and a generative melody driven by the statements reaching the server.

Scenarios are generated randomly each time, and each round uses one of six schemas (the original `t`/`u`, orders, books, tickets, tracks or sensor readings) with the same table shapes under different names. Level progress, Peak Load scores, badges and sound settings are stored in the browser's `localStorage`.

The trees are miniatures with a few rows per page so they fit on screen. Costs and estimates in the text are scaled to a 2,000,000-row table with 20,000 clustered leaf pages.
