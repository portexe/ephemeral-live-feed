module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_user
      reject_unauthorized_connection unless current_user
    end

    private

    def find_user
      verified_user = User.find_by(id: cookies.encrypted['_ephemeral_live_feed_session']['warden.user.user.key'][0][0])

      verified_user || nil
    end
  end
end
