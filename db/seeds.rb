# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Seeding..."
#Users
john = User.create(username: "johnsmith", password: "12345", password_confirmation: "12345", email: "fake@fake.com", phone_number: "5555555550", first_name: "John", last_name: "Smith")
toby = User.create(username: "safariman", password: "12345", password_confirmation: "12345", email: "superFake@fakestemail.com,", phone_number: "5555555551", first_name: "Toby", last_name: "Narra")
jenny = User.create(username: "jenny55", password: "12345", password_confirmation: "12345", email: "jennykloel@notreal.com", phone_number: "5555555552", first_name: "Jenny", last_name: "Loel")
alexa = User.create(username: "alexasmith", password: "12345", password_confirmation: "12345", email: "alexafromamazon@notreal.com", phone_number: "5555555553", first_name: "Alexa", last_name: "Robot")
trent = User.create(username: "ickython", password: "12345", password_confirmation: "12345", email: "theassembly@notreal.com", phone_number: "5555555554", first_name: "Trent", last_name: "Ickython")
fjord = User.create(username: "stone15", password: "12345", password_confirmation: "12345", email: "fakeaccent@notreal.com", phone_number: "5555555555", first_name: "Fjord", last_name: "Stone")
laura = User.create(username: "thelaurab", password: "12345", password_confirmation: "12345", email: "laurab@notreal.com", phone_number: "5555555556", first_name: "Laura", last_name: "Bee")

#Trips
Trip.create(title: "Kansas Pheasants", image: "http://midwestwhitetailadventures.com/proof/wp-content/uploads/2019/07/kansas-pheasant-hunt-gallery-5.jpg", date: "10/20/22 - 10/30/22", location: "10 Gauge Outfitters - 886 90th Ave, Kinsley, KS 67547", description: "We are headed out on 10/20 to one of the premier pheasant hunting locations within Kansas. The weather is looking to be cooler, highs around the mid-40s so make sure to pack your clothing accordingly. For any questions, touch base with me.", user_id: toby.id).trip_memberships.create(user_id: toby.id)
Trip.create(title: "Tokyo Trip", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dG9reW98ZW58MHx8MHx8&w=1000&q=80", date: "05/12/22-06/01/22", location: "Tokyo, Japan", description: "Let's go to Tokyo! It is finally happening! We need to figure out whose house we're meeting up at the day before our flights out to carpool still. Other than that, make sure you have the items listed below!", user_id: laura.id).trip_memberships.create(user_id: laura.id)
Trip.create(title: "Mountain Climbing in Denver, CO", image: "https://denvermountainguiding.com/static/img/tabletop.jpg", date: "08/21/22", location: "Denver, CO", description: "Our day trip will start at 6am to make sure we get to the climb at a reasonable time. Make sure to remember all of your gear below. Laura, make sure you bring your yeti for drinks. This climb will be pretty challenging, but we won't give up. I don't even know how to climb to be completely honest but I wanted to try something new with y'all.", user_id: alexa.id).trip_memberships.create(user_id: alexa.id)
Trip.create(title: "Fly-Fishing in Scotland!", image: "http://midcurrent.com/wp-content/uploads/2019/03/cast.jpg", date: "03/07/23 - 03/14/23", location: "Scotland", description: "We fishing for fishes in Scotland.", user_id: trent.id).trip_memberships.create(user_id: trent.id)

#Items
Item.create(name: "Soft Shotgun Case", description: "You need a soft case to transport your shotgun in a packed jeep we will be taking to the field.", image: "https://scheels.scene7.com/is/image/Scheels/73761801618?wid=300&hei=300&qlt=60")
Item.create(name: "Box of Shotshells", description: "Bring atleast 10 boxes of ammo for the week. Make sure it is the appropriate gauge for your shotgun!", image: "https://storage.googleapis.com/content.ezadtv.com/truevalue-images/197259_000_001.png")
Item.create(name: "Rubber Boots", description: "Need waterproof books like muck boots.", image: "https://dks.scene7.com/is/image/GolfGalaxy/15MBOMRCTCSPRTXXXFBO_Black?qlt=70&wid=600&fmt=pjpeg")
Item.create(name: "Personal Snacks", description: "Bring a healthy amount of snacks for the field.", image: "https://www.kindsnacks.com/on/demandware.static/-/Sites-kind-snacks-master/default/dw375d7ee0/images/20802-main-protein-double-dark-chocolate-nut.png")
Item.create(name: "Tip for Guides", description: "Bring $200 to tip the guide", image: "https://storage.googleapis.com/afs-prod/media/7168e34cb2c944689d6cb2843fefce0e/2016.jpeg")
Item.create(name: "Bottle of Liquor", description: "We'll be here for a bit, and want to make sure we all split the responsibility. So bring a bottle or two to share!", image: "https://cdn.caskers.com/catalog/product/cache/ce56bc73870585a38310c58e499d2fd4/b/l/blanton_s_original_single_barrel_bourbon_whiskey_1.jpg")
Item.create(name: "Set of Nice Clothing", description: "May go to dinner at a nice restaurant one night. Have appropriate clothing for it", image: "https://i.pinimg.com/originals/4a/fe/21/4afe2104c2f9216c973e8423e3e40f3b.jpg")

#TripItems
TripItem.create(trip_id: 1, item_id: 1, quantity: 1, acquired: false)
TripItem.create(trip_id: 1, item_id: 2, quantity: 10, acquired: false)
TripItem.create(trip_id: 1, item_id: 3, quantity: 1, acquired: false)
TripItem.create(trip_id: 1, item_id: 4, quantity: 20, acquired: false)
TripItem.create(trip_id: 1, item_id: 5, quantity: 200, acquired: false)
TripItem.create(trip_id: 1, item_id: 6, quantity: 2, acquired: false)
TripItem.create(trip_id: 1, item_id: 7, quantity: 1, acquired: false)

#UserTrips
UserTrip.create(trip_id: 1, user_id: 1)
TripMembership.create(trip_id: 1, user_id: 1)
UserTrip.create(trip_id: 1, user_id: 3)
TripMembership.create(trip_id: 1, user_id: 3)
UserTrip.create(trip_id: 1, user_id: 4)
TripMembership.create(trip_id: 1, user_id: 4)
UserTrip.create(trip_id: 2, user_id: 1)
TripMembership.create(trip_id: 2, user_id: 1)
UserTrip.create(trip_id: 2, user_id: 2)
TripMembership.create(trip_id: 2, user_id: 2)
UserTrip.create(trip_id: 2, user_id: 6)
TripMembership.create(trip_id: 2, user_id: 6)
UserTrip.create(trip_id: 2, user_id: 4)
TripMembership.create(trip_id: 2, user_id: 4)
UserTrip.create(trip_id: 3, user_id: 2)
TripMembership.create(trip_id: 3, user_id: 2)
UserTrip.create(trip_id: 3, user_id: 3)
TripMembership.create(trip_id: 3, user_id: 3)
UserTrip.create(trip_id: 3, user_id: 7)
TripMembership.create(trip_id: 3, user_id: 7)
UserTrip.create(trip_id: 4, user_id: 7)
TripMembership.create(trip_id: 4, user_id: 7)
UserTrip.create(trip_id: 4, user_id: 6)
TripMembership.create(trip_id: 4, user_id: 6)


puts "Done seeding.."
