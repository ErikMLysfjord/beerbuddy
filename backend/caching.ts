import crypto from "crypto";
import NodeCache from "node-cache";
import { Request, Response, NextFunction } from "express";

type CacheContent = {
  response: string;
};

// Cache for 24 hours
const myCache = new NodeCache({ stdTTL: 60 * 60 * 24 });
/**
 * Middleware function for caching responses.
 * It creates a unique key by hashing the request URL and body using MD5.
 * If a response for the key is found in the cache, it sends the cached response.
 * Otherwise, it calls the next middleware and caches the response before sending it.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 */
const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const hash = crypto.createHash("md5");
  const keyData = req.originalUrl + JSON.stringify(req.body);

  hash.update(keyData);
  const key = hash.digest("hex");

  const cacheContent: CacheContent = myCache.get(key);

  if (cacheContent) {
    return res.send(cacheContent.response);
  } else {
    const sendResponse = res.send;
    res.send = (body) => {
      myCache.set(key, JSON.stringify(body));
      return sendResponse(body);
    };
    next();
  }
};

export { cacheMiddleware, myCache };
