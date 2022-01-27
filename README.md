# GearList Trip Organization App

If you are anything like me, organizing trips with my friends is nothing short of herding cats. As avid outdoorsman, many of our activities that we embark on during these trips involve a lot of gear that our group will need to get the job done. GearList was created to alleviate the pains of group travel organization by allowing users to clearly present all the information a trip-goer may need in one place. 

## Technologies
This project is created with the following technologies:
- Frontend: React.js with Material Ui and Bootstrap
- Backend: Ruby on Rails, ActiveRecord, ActiveMailer, and ActiveCable
- Deployed on Heroku at mygearlist.herokuapp.com

## Launch
Either visit mygearlist.herokuapp.com for the deployed version or:

Launch backend
```
$ bundle install
$ rails db:migrate
$ rails db:seed
$ Navigate to client/src/messages/MessageList.js -> line-18, change process.env.REACT_APP_WS_ROOT to 'ws://localhost:3000/cable' to enable live chat feature when running locally.
$ rails s
```
Lauch frontend
```
$ cd client/
$ npm install
$ npm start
```
Navigate
```
localhost:3000/
```





