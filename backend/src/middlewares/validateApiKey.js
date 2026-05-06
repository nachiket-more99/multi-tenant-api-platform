import { prisma } from '../lib/prisma.js';
import { redis } from "../utils/redis.js";
import { createHash } from "../utils/crypto.js";

export const validateApiKey = async (req, res, next) => {
    try{
        // extract key from header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: "API key required" });
        }

        // Extract token after 'Bearer '
        const token = authHeader.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({ error: "Invalid auth format" });
        }

        // Hash it with SHA-256
        const keyHash = createHash(token);

        // check redis cache 
        const cached = await redis.get(keyHash);

        if (cached) {
            console.log("API key fetched from cache");
            const parsed = JSON.parse(cached);

            // attach to request
            req.apiKey = parsed;
            return next();
        }

        // if not in cache => search in db by hash
        const key = await prisma.apiKey.findUnique({
            where: {
                hash_key: String(keyHash),   
            },
        });

        if (!key) {
            throw new AppError("API key not found", 401);
        }

        if (!key.is_active) {
            throw new AppError("API key not active", 401);
        }

        console.log("API key fetched from DB");

        // save to redis cache for 5 mins
        await redis.set(keyHash, JSON.stringify(key), "EX", 300);

        // attach key to req
        req.apiKey = key;

        next();

    } 
    catch (err) {
        return res.status(500).json({ error: err.message });
    }

}