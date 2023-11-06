module ApplicationCable  
  class Connection < ActionCable::Connection::Base
    identified_by :client_id

    def connect
      self.client_id = request.params[:client]
      reject_unauthorized_connection unless client_id_present?
    end

    def disconnect
      RedisService.remove(client_id)
    end

    private

    def client_id_present?
      client_id.present?
    end
  end
end
