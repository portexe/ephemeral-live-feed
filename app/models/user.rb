# frozen_string_literal: true

class User < ApplicationRecord
  has_many :user_topics
  has_many :topics, through: :user_topics

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
