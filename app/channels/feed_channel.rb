class FeedChannel < ApplicationCable::Channel
    def subscribed
        puts "Connected"
        stream_from :feed_channel

        sleep(2.seconds)

        ActionCable.server.broadcast(:feed_channel, { body: { text: 'Message number 1', id: 'r843', topic: 'food' } })
        ActionCable.server.broadcast(:feed_channel, { body: { text: 'Message number 2', id: 'g89re', topic: 'music' } })
    end
end