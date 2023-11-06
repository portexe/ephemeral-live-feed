require 'securerandom'

class ApiController < ApplicationController
    skip_before_action :verify_authenticity_token

    def select_topics
        topics = params[:topics]

        return render json: { success: false, error: "Must provide a list of topics", session_id: nil }, status: :bad_request unless topics && topics.count > 0

        unique_id = SecureRandom.uuid

        RedisService.set(unique_id, topics)

        render json: { success: true, error: nil, session_id: unique_id }
    end
end