# frozen_string_literal: true

require 'faker'

module TempFeedBroadcaster
  def self.broadcast_message
    @topics = %i[music games movies books]

    username, email = Faker::Internet.user.values_at(:username, :email)

    topic_map = {
      movies: lambda {
        movie_quote = Faker::Movie.quote
        movie_title = Faker::Movie.title

        "From: #{username} | #{email}: My favorite movie is #{movie_title} and I love the part where they say #{movie_quote}"
      },
      music: lambda {
        music_album = Faker::Music.album
        music_artist = Faker::Music.band

        "From: #{username} | #{email}: My favorite album by #{music_artist} is #{music_album}"
      },
      books: lambda {
        book_title = Faker::Book.title
        book_author = Faker::Book.author

        "From: #{username} | #{email}: My favorite book is #{book_title} by #{book_author}"
      },
      games: lambda {
        game_title = Faker::Game.title
        game_platform = Faker::Game.platform

        "From: #{username} | #{email}: My favorite game right now is #{game_title} on #{game_platform}"
      }
    }

    random_topic = @topics.sample

    message_data = {
      body: {
        text: topic_map[random_topic].call,
        id: SecureRandom.hex(3),
        topic: random_topic
      }
    }

    ActionCable.server.broadcast("feed_channel_#{random_topic}", message_data)
  end
end
