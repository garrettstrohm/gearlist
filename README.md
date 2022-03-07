# GearList Trip Organization App

If you are anything like me, organizing trips with my friends is nothing short of herding cats. As avid outdoorsmen, many of our activities that we embark on during these trips involve a lot of gear that our group will need to get the job done. GearList was created to alleviate the pains of group travel organization by allowing users to clearly present all the information a trip-goer may need in one place. 

## Technologies
This project uses the following technologies:
- Frontend: React.js with Material Ui and Bootstrap v5
- Backend: Ruby on Rails, Postgresql, ActiveRecord, ActionMailer, and ActionCable
- Deployed on Heroku at https://mygearlist.herokuapp.com

## Launch
Either visit https://mygearlist.herokuapp.com for the deployed version or:

Launch backend
```
$ bundle install
$ rails db:migrate
$ rails db:seed
$ Navigate to client/src/messages/MessageList.js -> line-18, change process.env.REACT_APP_WS_ROOT to 'ws://localhost:3000/cable' to enable live chat feature when running locally.
$ rails s
```
Launch frontend
```
$ cd client/
$ npm install
$ npm start
```
Navigate
```
localhost:3000/
```

## Features

<img width="1440" alt="Screen Shot 2022-01-27 at 10 02 56 AM" src="https://user-images.githubusercontent.com/89401426/151410362-ddea1bde-82e4-4837-881b-cfd7733c1581.png">


### Login Screen
- GearList offers full user authentication utilizing the Bcrypt gem. Users can Login, SignUp, and recover a forgotten password via a recovery token sent to the user via ActiveMailer.


<img width="1440" alt="Screen Shot 2022-01-27 at 10 23 14 AM" src="https://user-images.githubusercontent.com/89401426/151420008-4c5934a6-793a-4ca4-9a80-e142d9e2ccf4.png">


### Sign Up Screen
- Users can sign up and create a new account.


<img width="1440" alt="Screen Shot 2022-01-27 at 10 23 52 AM" src="https://user-images.githubusercontent.com/89401426/151420036-e280b742-b6df-4813-a394-b4e175b179a0.png">


### Forgot Password
- Users can recover a password using their accounts email.
- An email will be sent with a link to the recover password page along with a recovery password that was generated when the email was sent.


<img width="1439" alt="Screen Shot 2022-01-27 at 11 47 41 AM" src="https://user-images.githubusercontent.com/89401426/151424077-c51c204b-7acf-4edb-bc27-b97e9198b857.png">


### Reset Forgotten Password
- Users can reset a forgotten password.


<img width="1440" alt="Screen Shot 2022-01-27 at 10 25 27 AM" src="https://user-images.githubusercontent.com/89401426/151419337-463a71c0-e97e-4f67-982f-52e320659587.png">


### Home Page
GearList's homepage displays all of the current trips and adventures the user currently has. From here, users can do the following:
- Create a new organized trip
- Delete organized trips and adventures
- Search organized trips and adventures
- Access their profile info
  - Change password
  - Change email associated with the account
- Access trip chats


<img width="1439" alt="Screen Shot 2022-01-27 at 11 46 26 AM" src="https://user-images.githubusercontent.com/89401426/151424215-8ed79002-9c34-4ba2-b857-2e68dc9259a6.png">


### Create a Trip
- Users can create a new organized trip by selecting the hamburger menu and selecting create a trip.


<img width="1440" alt="Screen Shot 2022-01-27 at 11 39 58 AM" src="https://user-images.githubusercontent.com/89401426/151423063-d1a4e4ff-a09f-4028-9e64-878ae82997be.png">

<img width="1440" alt="Screen Shot 2022-01-27 at 11 40 13 AM" src="https://user-images.githubusercontent.com/89401426/151423133-f6ecc45c-a06e-48ee-bb72-2f8ec3c7079c.png">


### Trip Page
Trip organizers can do the following:
- Change trip image
- Add trip items that the group need
- Add personal items
- Edit the trip description
- Add trip goers/adventurers
  - When added, an email will be sent to the added user alerting them that they were added to a trip.
- Remove trip goers/adventurers


![Screen Shot 2022-01-27 at 11 43 10 AM](https://user-images.githubusercontent.com/89401426/151423638-997df9c4-0e00-4948-af88-24d2b925eea3.png)


### Adventure Page
Adventurers can:
- Create a list of personal items
- View trip items


<img width="1440" alt="Screen Shot 2022-01-27 at 10 26 19 AM" src="https://user-images.githubusercontent.com/89401426/151420065-4255adfa-016c-4080-a12a-f02b7e3ee124.png">


### Live Chats
- Users can chat with other users on the same trip with a live chat feature utilizing ActionCable


<img width="1440" alt="Screen Shot 2022-01-27 at 10 27 52 AM" src="https://user-images.githubusercontent.com/89401426/151420263-41be7bb7-108a-4f36-811d-93c4f2e8b63c.png">

### Profile Page
- Users can view their current information
- Password can be reset, as well as their email.


### Video Demo
https://youtu.be/gFYWwpiAPZk


## Created By

### Garrett Strohm
- Github: <a href="https://github.com/garrettstrohm/">garrettstrohm</a>
- LinkedIn: <a href='https://www.linkedin.com/in/gstrohm/'>Garrett Strohm's LinkedIn</a>
- Email: <a href='mailto: garres4@vt.edu'>garres4@vt.edu</a>
- Medium: <a href='https://medium.com/@garres4'>@garres4</a>







