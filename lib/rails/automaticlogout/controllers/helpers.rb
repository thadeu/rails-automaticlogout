module Rails::AutomaticLogout
  module Controllers
    module Helpers
      extend ActiveSupport::Concern

      included do
      end

      def current_time
        Time.now
      end

      def expires_at(time)
        current_time + time
      end

      def expires_at_in_seconds(time)
        time.seconds.to_i
      end

      module ClassMethods
        def automatic_logout_at(time: 1.hour, message: "Session expired! You will be redirect.")
          prepend_before_filter do |c|
            if current_user
              c.session[:seconds] = expires_at_in_seconds(time)
              c.session[:message] = message
            end
          end
        end
      end
    end
  end
end
