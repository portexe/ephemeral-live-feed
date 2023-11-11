class ApiController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :authenticate_user!

    def select_topics
        topic_names = params[:topics]

        return render json: { success: false, error: "Must provide a list of topics", session_id: nil }, status: :bad_request unless topic_names.present?

        user = @user || set_user

        topics = Topic.where(name: topic_names)

        user.topics = topics

        if user.save
            render json: { success: true, topics: topic_names }, status: :ok
        else
            render json: { success: false, error: "Unable to update topics", topics: nil }, status: :unprocessable_entity
        end
    end

    def get_user_topics
        user = @user || set_user

        topics = user.topics

        render json: { success: true, topics: topics }, status: :ok
    end

    private

    def set_user
        @user ||= find_user
    end

    def find_user
        user = User.find_by(id: cookies.encrypted['_ephemeral_live_feed_session']['warden.user.user.key'][0][0])

        user || nil
    end
end
