class AddUserTopics < ActiveRecord::Migration[7.1]
  def change
    create_table :topics do |t|
      t.string :name
    end

    create_table :user_topics do |t|
      t.belongs_to :user
      t.belongs_to :topic
    end
  end
end
