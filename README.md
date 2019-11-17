# Mom 'N Pop 

This app includes an interactive map that keeps track of all the awesome local mom-and-pop shops in an area. You can add your own recommendations, view recommendations from others, and filter the markers by their category (drinks, food, or all). It is both mobile and web-compatible.

You can try it out [here](https://momnpop.herokuapp.com/).

## Tools Utilized
* Express
* Sequelize
* MapBox GL JS
* Geocoder API
* Yelp API
* Heroku

## How To Use
Go to the app's [website](https://momnpop.herokuapp.com/). If you are on the mobile version, you can click the "?" button to view further information. Pan around on the map and see what markers are in the area and you can click on each one to get more details about the mom-and-pop location including a photo and a recommendation. You can also use the "+" button to add your own. If you want to filer by only drink places or only food places there are buttons at the top for that.

## How It Works
Sequelize is used to store the data and return it to the page through GET and POST requests. In the form the location input comes from the Geocoder API from MapBox which saves the longitude and latitude of the place to be displayed on the map with Map Box markers. The popup pulls information from the user input and also a photo from the Yelp API on the backend. The user can further filter between the categories of places (drinks, food, all) which is handled through front end JavaScript that displays the relevent markers. Our app is hosted by Heroku.

## App View

### Web Version
![map project](https://user-images.githubusercontent.com/26778117/69013713-17c7a580-0938-11ea-870d-31d4a5b59b87.PNG)

### Mobile Version
![phone](https://user-images.githubusercontent.com/26778117/69013728-404f9f80-0938-11ea-96bf-9d6aea0e81e9.PNG)

### Browse the Map
![browsing](https://user-images.githubusercontent.com/26778117/69013747-7725b580-0938-11ea-89c2-5e1612a9933c.gif)

### Add a New Mom-and-Pop Location
![adding](https://user-images.githubusercontent.com/26778117/69013740-607f5e80-0938-11ea-9b8d-42b509a911d5.gif)

## Author(s)
* [Madeleine Prak](https://github.com/madeleineprak/) - Front End Logic / MapBox
* [Taylor Ellis](https://github.com/teellis20) - Backend Database Handling
* [Grant Bowen](https://github.com/itsgoodtobegrant) - Front End Design / UI