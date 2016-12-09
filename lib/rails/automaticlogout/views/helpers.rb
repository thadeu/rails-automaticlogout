module Rails::AutomaticLogout
  module Views
    module Helpers
      def regressive_timer
        render 'automatic_logout/timer.js'
      end
    end
  end
end
