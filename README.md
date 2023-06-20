# coverage-map

## Project setup
```
npm install -D tailwindcss [check: https://tailwindcss.com/docs/installation]
npm install @vue/cli
vue add unit-jest
npm install --save-dev @vue/test-utils@legacy
npm i @googlemaps/js-api-loader [install google maps javascript loader]
```

### Compiles and hot-reloads for development
```
npm run start or npm start
```
Right Charge Project Description

**INSTALLATIONS**:
Install tailwind i.e. npm install -D tailwindcss [check: https://tailwindcss.com/docs/installation]
Install vue-cli i.e. npm install @vue/cli
Install jest with vue cli i.e. vue add unit-jest
Install vue-test-utils i.e.  npm install --save-dev @vue/test-utils@legacy
Install the Google maps javascript api loader i.e. npm i @googlemaps/js-api-loader 

**PROJECT DESCRIPTION**

Start the application by running “ npm start ” or “npm run start” (as script has been edited to include a watch option and the outputting of tailwind to vanilla css file).
The application features 2 pages as initially provided: Home and Coverage Overview.
The **CoverView page** is the focus of the project:
-	It has been built to be responsive from about xs screen width to 2xl screen width according to tailwind standard sizing
-	This page also features responsive select, label, button and dropdown templates  for filtering data and storing user inputs.
-	The data is obtained from sampleData.json and transformed to a more simpler array of objects suitable for querying with each object representing a marker on the map with properties such as:
•	Installer
•	Postcode
•	Radius
•	Charger (array) 
-	The map is represented through a child component that receives the filtered array of objects as props.
-	This also includes a button for resetting the data to initial state.
-	
The Map component:
It resides as a child component that receives data that has been filtered according to user inputs and search. The component initializes the loader class with the api key and adds the map and markers when component has been mounted. The postcode property in each object of the array is transformed to coordinates using the google map geocoder in the addMarker method right before marker is created and stored in the markers array in data() for tracking.

The Markers:
The changes to the prop data passed into the Map component  are watched and prop changes calls a function that makes the markers invisible before emptying the markers array. Then, the updated array of objects passed through the props are used to create new markers and store them in the markers array. This means the markers on the map change according to user filter inputs.
Below the map is also a table to show all the objects of the props and shows installer, postcode, radius and chargers dynamically. 

{Please note not all objects that are visible on the table are visible on map markers as some of the postcodes are invalid (please check catch section of the addMarker to see how the error is handled)}.

Testing:
Unit testing was done using Jest and vue/testing-utils to highlight all major behaviors and functions in the CoverOverview and Map components. Please check the tests folder for the tests.






