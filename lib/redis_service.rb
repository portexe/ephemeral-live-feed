require 'redis'

class RedisService
    def self.redis
        @redis ||= Redis.new
    end

    def self.set(key, value)
        redis.set(key, value)
    end

    def self.get(key)
        redis.get(key)
    end

    def self.remove(key)
        redis.del(key)
    end
end
