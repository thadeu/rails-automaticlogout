RSpec.describe 'AutomaticLogout::SessionsController', type: :controller do

  # check value in session activ e inactive
  describe 'check application' do
    context 'when logged in' do
      it 'returns live true'
      it 'returns auto_session_expires_at not empty'
      it 'returns message not empty'
      it 'returns seconds not empty'
    end
    
    context 'when there isnt session active' do
      it 'returns live false'
      it 'returns auto_session_expires_at empty'
      it 'returns message empty'
      it 'returns seconds empty'
    end
  end

end