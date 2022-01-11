# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Seeding..."
#Users
john = User.create(user_name: "johnsmith", password: "abcdef", password_confirmation: "abcdef", email: "johnsmith@notreal.com", phone_number: "5555555555", first_name: "John", last_name: "Smith")
puts "Done seeding.."
