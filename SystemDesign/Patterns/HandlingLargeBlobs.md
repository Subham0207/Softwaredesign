# Upload 
- presigned write URL (Temp permission slip)
    - expiresAt
    - path
    - operations allowed: []
- `Resumable uploads`: Chunks + presignedURL by chunks: For reliability.
    - blob storage acknowledges chunk received by returning a checksum (ETag) for that chunk to user.
- event to server on upload finished from blobstorage

# download
- presigned read URL
- CDN
- 

# security check
- private quarantine/bucket
- virus scan
- then move to public bucket

# CDN and authorization using signed URL
- CDN check verify a token that contains a secret.

# Summary
- upload
- download
- security
- CDN authentication