import { redis } from "../utils/redis.js";
import { AppError } from "../utils/AppError.js";

export const rateLimiter = async (req, res, next) => {
  try {
    const { id, rate_limit } = req.apiKey;

    const redisKey = `ratelimit:${id}`;

    const now = Date.now();
    const windowSize = 60 * 1000;

    // remove old requests
    await redis.zremrangebyscore(
      redisKey,
      0,
      now - windowSize
    );

    // current request count
    const count = await redis.zcard(redisKey);

    console.log({
      redisKey,
      count,
      limit: rate_limit,
    });

    // block if limit exceeded
    if (count >= rate_limit) {
      throw new AppError(
        "Rate limit exceeded",
        429
      );
    }

    // add current request
    await redis.zadd(
      redisKey,
      now,
      `${now}`
    );

    // auto cleanup
    await redis.expire(redisKey, 60);

    res.set(
      "X-RateLimit-Limit",
      rate_limit
    );

    res.set(
      "X-RateLimit-Remaining",
      rate_limit - (count + 1)
    );

    next();
  } catch (err) {
    console.log(
      "RATE LIMIT ERROR:",
      err
    );

    res
      .status(err.statusCode || 500)
      .json({
        error: err.message,
      });
  }
};