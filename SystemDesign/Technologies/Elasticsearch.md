# Elastic Search Usecases
- vector search
- full text search
- geospatial search

# How to use
- Not as your primary database. Due to no durability and reliability gauarntees.
    - postgreSQL -> CDC -> ElasiticSearch
- Read heavy workload.
- Eventual consistency
- Denormalized data only. No rested relation query.

# indexing 
# searching ( _search )
- _score: sort by relevance
    - Algo used like: TF-IDF

# pagination
- from, size
- search_after: [date, some_id]

# Point in time snapshot ( _pit )
- Its like MVCC in postgreSQL, which takes snapshots of db for a transaction used for read anamoly gaurantee. 
- But here you need to request a snapshot_id and provide that in subsequent request. And delete the snapshot afterwards.


# Deep dive
- Components:
    - Ingest node
    - coordinating node
    - data node
- Elasticsearch index
    - Shard and thier replicas
    - Lucene index (inverted index)
        - segments -- Mostly read only.
        - segment compaction/merging.
        - Doc values index