# From perspective of postgreSQL
## Properties of Databases:
- keys
    - primary key: 
    - foreign key: pk on another table. Enforces data integrity.
- Constraints
    - Unique - like email should be unique
- Index types
    - b-tree index `Default`
- Sharding
    - Always shard by primary key
    - keep relation tables data on same shard ( to avoid cross shard queries )
- Relations
    - One to one
    - many to many
    - one to many
- Normalization: data in separate tables, low redundancy vs Denormalization: data in same table, high redundancy


## How To write good queries
SQL QUERY TOOLBOX

Filtering
- WHERE
- AND / OR
- IN
- BETWEEN
- LIKE

Relationships
- JOIN
- LEFT JOIN
- EXISTS
- NOT EXISTS

Aggregation
- COUNT
- SUM
- AVG
- MIN / MAX
- GROUP BY
- HAVING

Results
- DISTINCT
- ORDER BY
- LIMIT

Important patterns
- Interval overlap:
  start < requestedEnd
  AND end > requestedStart

- Find missing/conflicting relationship:
  NOT EXISTS (...)

- Require all requested child values:
  GROUP BY parentId
  HAVING COUNT(DISTINCT childId) = N

- Pagination:
  ORDER BY x
  LIMIT N
  preferably cursor/keyset at scale

Schema/query thinking
1. Write access patterns
2. Design tables
3. Write query
4. Identify JOIN/filter/sort columns
5. Add appropriate indexes
6. Add PK/FK/UNIQUE constraints


## Kitchen sink query ( include every important SQL operation I could need )

`
    select *, count(*) from tableA as a
    LEFT JOIN tableB as b
    on a.colname = b.colname
    where col = 'something' and
    col in ('abc','xyz') and
    not exists
    (
        select 1 from tableC
        where tablaId = a.Id
        and exist.start_date < req.end_date
        and exist.end_date > req.start_date
    )
    and (
        select count(*) from tableD
        where col = 'some_value'
    ) = 2 and
    GROUP By colname
    HAVING COUNT(DISTINT col or *) = 2
    ORDER BY colname
    LIMIT 10
`


## Look into DB table desining tips file.