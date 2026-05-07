import { Queue } from 'bullmq';
import { redis } from '../utils/redis.js';

export const logQueue = new Queue('logs', { connection: redis });
export const usageQueue = new Queue('usage', { connection: redis });