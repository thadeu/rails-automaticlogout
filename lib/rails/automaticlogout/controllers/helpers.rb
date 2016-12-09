module Rails::AutomaticLogout
  module Controllers
    module Helpers
      def self.included(base)
        base.extend ClassMethods
      end

      module ClassMethods
        def automatic_logout_at(time: 1.hour, message: "Session expired! You will be redirect.")
          prepend_before_filter do |c|
            if c.session[:auto_session_expires_at].present? && c.session[:auto_session_expires_at] < Time.now
              c.send :reset_session
            else
              if current_user
                c.session[:auto_session_expires_at] = Time.now + time
                c.session[:message] = message
                c.session[:seconds] = time.seconds
              end
            end
          end
        end
      end
    end
  end
end
