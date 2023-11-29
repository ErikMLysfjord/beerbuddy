import crypto from "crypto";
import NodeCache from "node-cache";
import { Request, NextFunction, Response } from "express";

type CacheContent = {
  response: string;
};

interface CacheResponse extends Response {
  sendResponse?: (body: string) => void;
}

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
const cacheMiddleware = (
  req: Request,
  res: CacheResponse,
  next: NextFunction
) => {
  const hash = crypto.createHash("md5");
  const keyData = req.originalUrl + JSON.stringify(req.body);

  hash.update(keyData);
  const key = hash.digest("hex");

  const cacheContent: CacheContent | undefined = myCache.get(key);

  if (cacheContent) {
    res.send(cacheContent.response);
    return;
  } else {
    res.sendResponse = res.send;
    res.send = (body: string) => {
      myCache.set(key, { response: body });
      if (res.sendResponse === undefined) return res;
      res.sendResponse(body);
      return res;
    };
    next();
  }
};

export { cacheMiddleware, myCache };
