# Dashboard Introduction
## Technologies
NodeJS + Express + AngularJS  

## Installation
* Clone project to your machine. 
* Switch to DataDashboard directory `cd DataDashboard`
* Run `npm install` to install requirements
* Run `npm start` to start the app
* Open up your browser, and visit `127.0.0.1/3000`

## Features
* Login/Signup feature with **PassportJS**.
* Render time-series data with **nvd3**.
* Transport data with **WQTT**.

## Possible Improvements
* It can only render 1 data set. Should be better if it can load multiple data sets.
* Data load only once. Need modification if we would like to accept real-time data(add update method).