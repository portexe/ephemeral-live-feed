class FeedChannel < ApplicationCable::Channel
    def subscribed
        topics_list.each do |topic|
            stream_from "feed_channel_#{topic}"
        end
    end

    private

    def topics_list
        [:movies, :music, :books, :games]
        # val = RedisService.get(client_id)
        # return [] unless val
        # JSON.parse(val)
    end
end