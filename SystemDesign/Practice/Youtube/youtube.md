# Solution
- Go into how chunks can be streamed to client. The client has to request the next chunk's s3PresignedURL from the server.


# Deep dive

- Users may have poor or fluctuating network connections. How would you design your system to ensure that video streaming continues smoothly under these conditions?

    - Add chunking and transcoding steps and construct a manifest file. A manifest file is a map of qualities and bitrate to  ordered video chunks. This file will be download by the client. And client can now switch to different qualities when network condition changes.

- How would you decide when the client should switch up or down in quality between chunks so that it avoids both constant oscillation and long buffering?
    - if download time for a segment crosses a threshold we turn down the quality. Example if a segment is of 2 sec and it took 2 sec to download it we are slow, there is buffering so turn down the quality.
   - Now, the 2 sec segment is downloaded in 500 ms, we monitor for a few more segments and then step up the quality as we have enough room to stream chunks without buffering. I am assuming there is roughly 2x difference b/w chunk size of lower quality and next higher quality. And therefore the higher quality chunk will be downloaded in 1sec and we can stream without buffereing.

- Uploading large video files can be challenging due to network interruptions. Explain how your design allows users to resume an interrupted upload without starting over from scratch.

    - Since we are using s3 presigned Urls and uploading the video in chunks. If there is an interuption, the s3 presigned URL is valid for sometime and uploading from a failed can be retried.

    - Ask the backend for parts upload status. s3 has list parts API which returns which parts are uploaded. And the client can resume the upload from next part.


- How would you design your system to allow users to resume watching a video from where they left off, even if they switch devices?

    - we will store this info in video status table.
    we can use two mechanisms: periodically heartbeat from client, with the video progress.
    When a user closes a video, we can fire a hook which also sends the video progress. ( but this can sometimes not fire due to - say system crash )

    Now when user opens the video on a new device we get the progress from the DB and continue from there.
