topics = ['movies', 'music', 'books', 'games']

topics.each do |topic_name|
  Topic.find_or_create_by(name: topic_name)
end
