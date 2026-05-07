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
