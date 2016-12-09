Rails.application.routes.draw do
  get 'status_automatic_logout'  => 'automatic_logout/sessions#status'
  get 'destroy_automatic_logout' => 'automatic_logout/sessions#destroy'
end
