class ApiController < ApplicationController
    skip_before_action :verify_authenticity_token

    def select_topics
        topics = params[:topics]

        return render json: { success: false, error: "Must provide a list of topics" }, status: :bad_request unless topics && topics.count > 0

        render json: { success: true, error: nil }
    end
end