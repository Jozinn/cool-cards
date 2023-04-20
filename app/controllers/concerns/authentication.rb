module Authentication
    extend ActiveSupport::Concern

    included do
        before_action :current_player
        helper_method :current_player
        helper_method :player_signed_in?
    end

    def login(player)
        reset_session
        session[:current_player_id] = player.id
    end

    def logout
        reset_session
    end

    def redirect_if_authenticated
        redirect_to root_path if user_signed_in?
    end

    def authenticate_user!
        redirect_to root_path unless user_signed_in?
    end

    private
    def current_player
        Current.player ||= session[:current_player_id] && Player.find_by(id: session[:current_player_id])
    end

    def user_signed_in?
        Current.player.present?
    end
end