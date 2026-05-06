import { prisma } from '../lib/prisma.js';

export const apiUsageMiddleware = (req, res, next) => {
    // after response finishes → capture data
    res.on('finish', async () => {
        try{
            if (!req.apiKey) return;

            const key = req.apiKey

            // get current date with 00:00:00 for daily usage
            const now = new Date();
            const today = new Date(Date.UTC(
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate()
            ));

            // increment count by 1 and create if not present and save usage to DB 
            await prisma.apiUsage.upsert({
                where: {
                    api_key_id_path_date: {
                        api_key_id: key.id,
                        path: req.originalUrl,
                        date: today,
                    },
                },
                update: {
                    count: {
                        increment: 1,
                    },
                },
                create: {
                    tenant_id: key.tenant_id,
                    api_key_id: key.id,
                    path: req.originalUrl,
                    count: 1,
                    date: today,
                },
            });
        } catch (err) {
            console.error("Usage error:", err.message);
        }
    });

    // let request continue (next())
    next();
}