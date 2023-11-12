# frozen_string_literal: true

topics = %w[movies music books games]

topics.each do |topic_name|
  Topic.find_or_create_by(name: topic_name)
end
