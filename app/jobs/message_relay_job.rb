class MessageRelayJob < ApplicationJob
    queue_as :default
  
    def perform(message)
      trip = message.trip
      MessagesChannel.broadcast_to(trip, message)
    end
  end