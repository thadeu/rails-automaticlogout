module AutomaticLogout
  class SessionsController < ApplicationController
    skip_before_action :authenticate_user!, only: [:status, :destroy]

    def status
      response = {
        live: !!current_user,
        timeout: session[:auto_session_expires_at],
        message: session[:message],
        seconds: session[:seconds]
      }

      render json: response
    end

    def destroy
      session[:auto_session_expires_at] = ''
      session[:seconds] = ''
      session[:live] = !!current_user

      reset_session

      redirect_to root_path, notice: session[:message]
    end
  end
end
