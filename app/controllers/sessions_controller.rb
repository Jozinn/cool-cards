class SessionsController < ApplicationController
    before_action :redirect_if_authenticated

    def create
        @admin = Admin.where(email: admin_params[:email])

        if @admin && @admin.verify(admin_params[:password])
            session[:current_admin_id] = @admin.id
            render json: @admin
        else
            render json: {}, status: :unprocessable_entity
        end
    end

    private
    def admin_params
        params.require(:admin).permit(:email, :password)
    end
end
