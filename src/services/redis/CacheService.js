const redis = require('redis');

/* eslint no-underscore-dangle: 0 */
class CacheService {
  constructor() {
    this._client = redis.createClient({
      socket: {
        host: process.env.REDIS_SERVER,
      },
    });

    this._client.on('error', (error) => console.error(error));

    this._client.connect();
  }

  async set(key, value, expirationInSeconds = 3600) {
    await this._client.set(key, value, { EX: expirationInSeconds });
  }

  async get(key) {
    const result = await this._client.get(key);

    if (result === null) throw new Error('Cache tidak ditemukan');
    return result;
  }

  delete(key) {
    return this._client.del(key);
  }
}

module.exports = CacheService;
