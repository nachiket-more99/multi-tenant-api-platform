import { prisma } from '../lib/prisma.js';

export const logMiddleware = (req, res, next) => {
    // start timer
    const start = performance.now()

    // after response finishes → capture data
    res.on('finish', async () => {
        try{
            if (!req.apiKey) return;

            const responseTime = performance.now() - start

            const key = req.apiKey

            // save log to DB 
            await prisma.requestLog.create({
                data: {  
                    tenant_id: Number(key.tenant_id),    
                    api_key_id: Number(key.id),    
                    path: String(req.originalUrl),          
                    method: String(req.method),       
                    status_code: Number(res.statusCode),   
                    response_time: Number(responseTime) 
                },
            });
        } catch (err) {
            console.error("Log error:", err.message);
        }
    });

    // let request continue (next())
    next();
}