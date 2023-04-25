class Admin < ApplicationRecord
    validates :email, uniqueness: true
    validates :email, presence: true
    validates :password, length: { minimum: 8 }


    def password
        @password
    end

    def password=(plain)
        @password = plain
        self.secure_password = BCrypt::Password.create(plain)
    end

    def verify(plain)
        BCrypt::Password.new(secure_password).is_password?(plain)
    end
end
