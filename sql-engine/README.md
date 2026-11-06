# SQL Server Storage Engine pages

Self-contained interactive pages about how SQL Server stores and reads B+ tree indexes. Each page is one HTML file with inline CSS and JavaScript. The only external resources are Google Fonts.

| File | What it is |
|---|---|
| `index.html` | Landing page linking the three pages |
| `inside-an-8kb-page.html` | To-scale byte map of a clustered leaf page and a nonclustered leaf page, with inserts, deletes, compaction, page splits and record anatomy |
| `key-lookup-walkthrough.html` | Step-through of `SELECT * FROM t WHERE secondary_id = 4` as an Index Seek plus Key Lookup, with a cost model for the scan tipping point |
| `storage-engine-drill.html` | Nine-level game where you execute statements by hand |

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

Scenarios are generated randomly each time. Level progress is stored in the browser's `localStorage`.

The trees are miniatures with a few rows per page so they fit on screen. Costs and estimates in the text are scaled to a 2,000,000-row table with 20,000 clustered leaf pages.
