import cron from 'node-cron';
import { prisma } from '../lib/prisma.js';

// schedule job to run everyday at 2am to clean logs older than 30 days
cron.schedule('0 2 * * *', async () => {
    console.log('[CRON] Running log cleanup...');
    
    // calculate 30 days prior date as cutoff for log cleanup 
    const now = new Date();
    const cutoff = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() - 30 
    ));

    // deleting all logs older than cutoff
    const deleted = await prisma.requestLog.deleteMany({
        where: { created_at: { lt: cutoff } }
    });

    console.log(`[CRON] Deleted ${deleted.count} old logs`);
},{ 
    timezone: "UTC" 
});

// schedule cron job to log daily usage summary every day at midnight
cron.schedule('0 0 * * *', async () => {
    console.log('[CRON] Running daily usage summary...');

    // get todays date with no time
    const now = new Date();
    const today = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate()
    ));

    // aggregate all the daily api usage and get summary
    const summary = await prisma.apiUsage.aggregate({
        where: { date: today },
        _sum: { count: true }
    });

    console.log(`[CRON] Total requests today: ${summary._sum.count || 0}`);
},{ 
    timezone: "UTC" 
});

