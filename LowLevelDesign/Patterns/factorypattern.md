type Creator = (config: any) => RateLimiter;

class RateLimiterFactory {
    private static registry = new Map<string, Creator>();

    //creator is of type ()=>RateLimiter
    static register(name: string, creator: Creator): void {
        this.registry.set(name, creator);
    }

    static create(algorithm: string, config: any): RateLimiter {
        const creator = this.registry.get(algorithm);

        if (!creator) {
            throw new Error("Unknown algorithm");
        }

        return creator(config);
    }
}

RateLimiterFactory.register("tokenBucket", (config) => {
    if (config.tokens == null || config.refillRate == null)
        throw new Error("Missing token bucket params");

    return new TokenBucket(config.tokens, config.refillRate);
});

RateLimiterFactory.register("slidingWindow", (config) => {
    if (config.tokens == null || config.windowSize == null)
        throw new Error("Missing sliding window params");

    return new SlidingWindow(config.tokens, config.windowSize);
});