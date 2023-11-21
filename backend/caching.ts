import crypto from "crypto";
import NodeCache from "node-cache";

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
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {function} next - The next middleware function.
 */
const cacheMiddleware = (req, res, next: () => void) => {
  const hash = crypto.createHash("md5");
  const keyData = req.originalUrl + JSON.stringify(req.body);

  hash.update(keyData);
  const key = hash.digest("hex");

  const cacheContent: CacheContent = myCache.get(key);

  if (cacheContent) {
    res.send(cacheContent.response);
    return;
  } else {
    res.sendResponse = res.send;
    res.send = (body: string) => {
      myCache.set(key, { response: body });
      res.sendResponse(body);
    };
    next();
  }
};

export { cacheMiddleware, myCache };
