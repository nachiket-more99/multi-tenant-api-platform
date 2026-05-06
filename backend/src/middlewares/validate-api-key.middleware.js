import { generateApiKey, encryptKey, decryptKey } from "../../utils/crypto.js";

export const validateApiKey = () => {
    // extract key from header
    // Hash it with SHA-256
    // check redis cache => if found, attach to req and move on
    // if not in cache => search in db by hash
    // if not found or inactive => 401
    // save to redis cache for 5 mins
    // attach key to req

}