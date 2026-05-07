import { Worker } from 'bullmq';
import { prisma } from '../lib/prisma.js';
import { redis } from '../utils/redis.js';

new Worker('logs', async (job) => {
  console.log(`[LOG WORKER] Job received:`, job.data);
  
//   await new Promise(resolve => setTimeout(resolve, 5000));
  
  try {
    await prisma.requestLog.create({ data: job.data.log });
    console.log(`[LOG WORKER] Job done, log saved to DB`);
  } catch (err) {
    console.error(`[LOG WORKER] DB insert failed:`, err.message);
  }

}, { connection: redis });


new Worker('usage', async (job) => {
  console.log(`[USAGE WORKER] Job received:`, job.data);
  
//   await new Promise(resolve => setTimeout(resolve, 5000));
  
  try {
    await prisma.apiUsage.upsert(job.data.usage);
    console.log(`[USAGE WORKER] Job done, usage saved to DB`);
  } catch (err) {
    console.error(`[USAGE WORKER] DB insert failed:`, err.message);
  }

}, { connection: redis });


console.log('Workers running...');