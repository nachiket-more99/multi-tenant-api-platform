import { redis } from '../utils/redis.js';
import { AppError } from '../utils/AppError.js';

export const rateLimiter = async (req, res, next) => {
  try {
    const { id, rate_limit } = req.apiKey;

    const window = Math.floor(Date.now() / 60000);
    const redisKey = `ratelimit:${id}:${window}`;

    const count = await redis.incr(redisKey);

    if (count === 1) await redis.expire(redisKey, 60);

    if (count > rate_limit) {
      throw new AppError("Rate limit exceeded", 429);
    }

    res.set('X-RateLimit-Limit', rate_limit);
    res.set('X-RateLimit-Remaining', rate_limit - count);

    next();
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};