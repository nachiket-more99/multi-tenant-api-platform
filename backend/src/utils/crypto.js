import crypto from "crypto";

const ALGO = "aes-256-cbc";
const SECRET_KEY = process.env.API_KEY_SECRET; 
const IV_LENGTH = 16;

// generate key
export const generateApiKey = () => {
  return "sk_live_" + crypto.randomBytes(32).toString("hex");
};

// encrypt
export const encryptKey = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGO, Buffer.from(SECRET_KEY), iv);

  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

// decrypt
export const decryptKey = (text) => {
  const [iv, encryptedText] = text.split(":");

  const decipher = crypto.createDecipheriv(
    ALGO,
    Buffer.from(SECRET_KEY),
    Buffer.from(iv, "hex")
  );

  let decrypted = decipher.update(Buffer.from(encryptedText, "hex"));
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};