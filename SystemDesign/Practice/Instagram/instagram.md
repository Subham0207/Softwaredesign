# Solution
- use Fan out on write apprach - pre compuate a user's Feed.

# Functional requirement
- Users should be able to create posts featuring photos, videos, and a simple caption
- Users should be able to follow other users
- Users should be able to see a chronological feed of posts from the users they follow

System scale
- 500M DAU with 100 M posts per day.

# Non functional requirement
1. posts are eventually consistent. Availability is more important.
2. follow and posts should be durably stored ( reliability ).
3. System should handle surge traffic from : 500M DAU ( read >>> write )
4. individual component failure should not bring the whole system down
5. Latency in fetching feeds and media < 500ms

# Core entities
1. User
2. Post - Media, caption
3. Feed
4. Media
5. Follow

# API Routes
POST /posts/
req -> {
    filename: string
    caption: string
}

res -> {
    postId,
    s3PresignedURl
}

POST /follows/
req -> {
    follow: userId
}

res -> 201 OK

GET /feeds?cursor={1234}&limit=20

res -> {
    feed: { postid, postedBy, postedAt, caption, filelink }[]
}

# Deep dive

- How would you keep the merged feed correctly ordered by time when one part comes from precomputed entries and the celebrity part is fetched on read, especially with pagination?

    - fetch 20 posts from user feed, 20 posts from each celebrity. Sort only first 20 entries from these in memory, return and discard the rest. This takes NLogK time ( so 20 Log sources ( where sources is user feed + number of celebs))
    - return lastseentimestamp to know which entry to return next.
    - celebes posts will be stores using a sorted set and creation time as the score - {'posts:celeb1' : SortedSet[{ timestamp, post1}]}

- How would you handle the upload of large media files efficiently, particularly videos that could be up to 4GB in size?
    - multi part upload using s3 presigned URLs for each part. Post service creates a user upload session and signed part URLs. Then client sends chunks to s3. S3 responsds with ack that it recived.
    - Upload finished signal from s3 to our service


- How would you ensure fast media delivery to users globally, with photos and videos rendering quickly regardless of a user's location?

    - CDN
    - precompuate multi media variant.


- How would you decide which media variant to return for a user when you have multiple encodings or image sizes available at the edge?

    - We will take user network speed and device screen size into consideration.
    - These details can be communcated by the client using HTTP hints


- Redis operations

`
    GET / SET : Read and write cached values

    Hash : Store and retrieve fields of an object

    Sorted Set (ZSET) : Maintain elements sorted by a score

    ZADD : Add a post to a sorted set

    ZRANGE : Retrieve posts ordered by score, including timestamp-based ranges

    EXPIRE : Set a TTL on a key
`