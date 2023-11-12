# frozen_string_literal: true

class FeedChannel < ApplicationCable::Channel
  def subscribed
    topics_list.each do |topic|
      stream_from "feed_channel_#{topic.name}"
    end
  end

  private

  def topics_list
    current_user.topics
  end
end
