module Authentication
    extend ActiveSupport::Concern

    # include do
    #     before_action :current_player
    #     before_action :current_admin
    #     helper_method :current_player
    #     helper_method :current_admin
    #     helper_method :player_signed_in?
    #     helper_method :admin_signed_in?
    # end

    def login_player(player)
        session.delete(:current_player_id)
        session[:current_player_id] = player.id
    end

    def logout_player
        session.delete(:current_player_id)
    end

    def login_admin(admin)
        session.delete(:current_admin_id)
        session[:current_admin_id] = admin.id
    end

    def logout_admin
        session.delete(:current_admin_id)
    end

    def redirect_if_authenticated
        redirect_to player_path(current_player) if player_signed_in?
        redirect_to admin_path(current_admin) if admin_signed_in?
    end

    def authenticate_player!
        redirect_to root_path unless player_signed_in?
    end

    def authenticate_admin!
        redirect_to root_path unless admin_signed_in?
    end

    def current_player
        Current.player ||= session[:current_player_id] && Player.find_by(id: session[:current_player_id])
    end

    def current_admin
        Current.admin ||= session[:current_admin_id] && Admin.find_by(id: session[:current_admin_id])
    end

    def player_signed_in?
        session[:current_player_id] && Player.find_by(id: session[:current_player_id])
    end

    def admin_signed_in?
        session[:current_admin_id] && Admin.find_by(id: session[:current_admin_id])
    end
end