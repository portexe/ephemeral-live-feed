class FeedChannel < ApplicationCable::Channel
    def subscribed
        puts "Connected"
        stream_from :feed_channel

        ActionCable.server.broadcast(:feed_channel, { body: "Some data for you?" })
    end
end