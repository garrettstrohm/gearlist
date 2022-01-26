class UserMailer < ApplicationMailer

    def welcome_email(user)
        @user = user
        mail(to: @user.email, subject: 'Welcome to Your GearList!')
      end

    def added_adventurer_email(user, adventure)
      @user = user
      @adventure = adventure
      mail(to: @user.email, subject: "You've been added to a Trip!")
    end

end
