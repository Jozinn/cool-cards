class AdminsController < ApplicationController
    before_action :redirect_if_authenticated, only: :create
    
    def create
        @admin = Admin.new(admin_params)
        if @admin.save
            login_admin(@admin)
            render json: @admin
        else
            render json: @admin.errors, ststus: :unprocessable_entity
        end
    end

    def update
        @admin = Admin.find(params[:id])
        @admin.update(admin_params)
    end

    private
    def admin_params
        params.require(:admin).permit(:email, :password)
    end
end
