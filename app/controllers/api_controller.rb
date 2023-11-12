class ApiController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :authenticate_user!

    def select_topics
        topic_names = params[:topics]

        return render json: { success: false, error: "Must provide a list of topics", session_id: nil }, status: :bad_request unless topic_names.present?

        topics = Topic.where(name: topic_names)

        current_user.topics = topics

        if current_user.save
            render json: { success: true, topics: topic_names }, status: :ok
        else
            render json: { success: false, error: "Unable to update topics", topics: nil }, status: :unprocessable_entity
        end
    end

    def get_user_topics
        topics = current_user.topics

        render json: { success: true, topics: topics }, status: :ok
    end
end
