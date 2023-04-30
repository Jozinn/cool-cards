class SessionsController < ApplicationController
    before_action :redirect_if_authenticated, only: :create

    def create
        @admin = Admin.where(email: admin_params[:email])

        if @admin
            if @admin.verify(admin_params[:password])
                session[:current_admin_id] = @admin.id
                render json: @admin
            else
                render json: {error: 'wrong credentials'}, status: :unprocessable_entity
            end
        else
            render json: {error: 'wrong credentials'}, status: :unprocessable_entity
        end
    end

    def destroy
        logout_admin
    end

    private
    def admin_params
        params.require(:admin).permit(:email, :password)
    end
end
