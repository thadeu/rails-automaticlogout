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
        # ((current_time + time)).strftime("%s").to_i
        time.seconds.to_i
      end

      module ClassMethods
        def automatic_logout_at(time: 1.hour, message: "Session expired! You will be redirect.")
          prepend_before_filter do |c|
            if c.session[:auto_session_expires_at].present? && c.session[:auto_session_expires_at] < current_time
              c.send :reset_session
            else
              if current_user
                c.session[:auto_session_expires_at] = expires_at(time)
                c.session[:seconds] = expires_at_in_seconds(time)
                c.session[:message] = message
              end
            end
          end
        end
      end
    end
  end
end
