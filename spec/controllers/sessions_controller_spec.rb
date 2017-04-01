require 'spec_helper'

RSpec.describe 'AutomaticLogout::SessionsController', type: :controller do

  # check value in session active & inactive
  describe 'check application' do
    context 'when logged in' do
      pending 'returns live true'
      pending 'returns auto_session_expires_at not empty'
      pending 'returns message not empty'
      pending 'returns seconds not empty'
    end
    
    context 'when there isnt session active' do
      pending 'returns live false'
      pending 'returns auto_session_expires_at empty'
      pending 'returns message empty'
      pending 'returns seconds empty'
    end
  end

end