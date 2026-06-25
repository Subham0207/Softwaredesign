## Important Design Patterns
https://www.geeksforgeeks.org/system-design/software-design-patterns/

## More Design Patterns
1. Circuite Breaker
2. Round Robin

## The best way to prepare for system design interviews
I conducted 100s of interviews at Meta as a Staff engineer, and now I work with candidates everyday to help them prepare for interviews at the top tech companies.

Having helped thousands of candidates at this point, this is what I have found to be the most effective way to prepare for system design interviews.

0. Build the foundation: This may not be necessary if you're more senior or have significant system experience, but the first step is to get down the basics. There are two places I would start to get this foundation;

System Design Interview – An insider's guide by Alex Xu - https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF

System Design in a Hurry by me & Stefan - https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction

System Design ByteByteGo https://bytebytego.com/courses/system-design-interview/scale-from-zero-to-millions-of-users

Jordan Has No Life YouTube Channel - https://www.youtube.com/@jordanhasnolife5163

1. Decide on a framework. Thinking on your feet during an interview is hard. You want to do all you can to have a game plan going in via a framework you've practiced. There are a number of frameworks online, all of which are similar. I recommend this to candidates (https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery), but you'll find what works for you. The goal is to keep you focused and give you the structure to not get lost in the complexity in the short time window.

2. Choose a question to practice. You'll want to choose a question that has an answer key. This could be a question from Hello Interview Common Problems, https://www.hellointerview.com/learn/system-design/answer-keys/intro, (I am biased, but think these are the best quality and most candidates agree) or from another good resource like System Design Fight Club (https://www.youtube.com/@SDFC).

3. Read the requirements to understand the system you need to design. If your answer key is a video, watch just the start to understand the problem. If it's a blog post, read only the beginning until you get the picture.

4. Try it! Head over to a real whiteboard or open up a virtual whiteboard like Excalidraw. Start a timer for 35-50 minutes depending on how long the interview is at your target company (remember, 45 minute interviews are just 35 minutes since 5 minutes on either side is reserved for intros and questions respectively). In the allotted time, answer the question like it was a real interview. Don't cheat! If you don't know something, just jot it down on the board and keep moving.

5. Research what you didn't know. Once the time is up, chances are you have a long list of things you weren't sure about. These are the "known unknowns," or the things you know you did not know. Head over to ChatGPT or Google and start proactively filling in these gaps. Research that which you were unsure about to close the gaps.

6. Read the answer key. Only now should you actually read the answer key! Go back to that initial blog or YouTube video and read/watch it in full. This will fill the gaps on the "unknown unknowns," or the things you did not know you did not know. Having just struggled through the problem, the answer key will now click and be retained at a rate 10x that of had you just read the guide from the start.

7. Rinse and repeat! Keep doing this same process with different questions until you start to feel confident and comfortable.

(optional) 8. Mock Interview. Again, acknowledging my bias here as someone who runs a mock interview platform. But, even if you don't use Hello Interview, the mock is your chance to take all that you've learned and put it to the test. You can have a real interviewer from your target company interview you so you can see exactly just how ready you are and then adjust your preparation based on the feedback.

Common Questions

Q: Do I need to read DDIA?
A: No, it's a great resource. But far too dense and has way more information than you need for an interview. If you have endless time, go for it, but most don't and their are better ways to study.

Q: What is the biggest mistakes you see candidates make?
A: They spend all their time passively consuming content, either videos or books, and not nearly enough time actually trying themselves. You learn by doing so much quicker than by reading passively.

Q: What are the types of problems I should practice?
A: Just like with coding interviews you can classify system design questions into similar patterns. I recommend you practice a problem from each pattern category. Common categories are:

1. Online Ticketing Systems: Addressing consistency and concurrency in high-demand ticket sales
2. Streaming Services: Design challenges related to real-time data streaming and content delivery
3. Location-Based Services: Designing for location tracking and geo-based recommendations
4. E-commerce Platforms: Scalability and transaction management for online shopping
5. Social Networks: Handling data scalability, real-time updates, and network effects
6. Messaging Platforms: Real-time messaging, notifications, and chat systems
7. Online Banking and Financial Services: Ensuring security, privacy, and transaction consistency
8. Collaborative Editing Tools: Concurrency and conflict resolution in real-time document editing
9. Cloud Storage Services: Efficient and scalable file storage and sharing solutions
10. Online Competition Platforms: Real-time interaction, leaderboard management, and competition handling
11. Design a foundational component: Like a rate limiter, message queue, cache, etc.