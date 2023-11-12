# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users

  get 'up' => 'rails/health#show', as: :rails_health_check

  root 'react#index'

  post 'api/log_out' => 'api#log_out'
  post 'api/select_topics' => 'api#select_topics'
  get 'api/get_user_topics' => 'api#get_user_topics'
end
