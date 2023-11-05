class FeedChannel < ApplicationCable::Channel
    def subscribed
        puts "Connected"
        stream_from :feed_channel
    end
end