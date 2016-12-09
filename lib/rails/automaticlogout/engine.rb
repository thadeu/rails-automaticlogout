module Rails
  module AutomaticLogout
    class Engine < ::Rails::Engine
      ActiveSupport.on_load :action_controller do
        include Rails::AutomaticLogout::Controllers::Helpers if defined?(Rails::AutomaticLogout::Controllers::Helpers)
      end

      ActiveSupport.on_load :action_view do
        include Rails::AutomaticLogout::Views::Helpers if defined?(Rails::AutomaticLogout::Views::Helpers)
      end
    end
  end
end
