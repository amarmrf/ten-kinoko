# ten-kinoko

An app to display weather condition and places to visit in Japanese city.

## Explanation

The main tool used in building this app is the Vue ecosystem which includes Nuxt and Vuetify. The total time used in building this app is still less than 16 hours recommendation that is given. There are 3 requirements and 3 considerations regarding this app. I will explain them here.

Requirements

- Weather Display: This app uses Openweather API to fetch the weather data in the available cities. The weather data is available for 5 days into the future with 3 hour interval of forecasts. The weather time is converted into local datetime.

- Places Listing: The app was uses the Foursquare Place Search API to list famous places to visit at the available cities. (Earlier there was a problem but is fixed now)

- Responsiveness: The UI framework that is used in this app is Vuetify which includes its own capability for responsive design. The main policy for responsiveness here is Grid which separates the UI into rows and columns that rearrange themselves upon breakpoint changes.

Design Considerations

- UI Design: The UI design is simple if not simplistic. It is just a card that can be toggled to show the weather or listed places in the selected cities. For empty state handling, if the city is not selected yet (which can only happen upon new loading) the card shows nothing. Error handling is also done in just logging the error to the console and the app is just left in a loading state when there is possible error (which is upon API fetching). The weather is shown for one time point with pagination to show the forecast. The places are shown in lists of five expendable panel containing the information of each place with a pagination to show the next or previous list.

- Maintenance: Nuxt is used as a framework for Vue which provides out of the box file structuring which make it easier to organize the component files and folders. Even though this is only a single page app, using Nuxt made it easier for maintenance purposes as it provides a standardized approach on the function of each folder, for example a plugin is set up out of the box which is used to configure an additional "services" folder that is used as a storage for the API fetching functions. If there is new API functions in the future, or if there is a need to look to these functions, we know they all is written in this folder named "services". Using components is also a straightforward way to organize the code for better traceability since it prevents any file to be too big and hard to refactor or improve.

- Security: Since the app is a quite simple, it is enough to store the API keys in a .env file. This require nuxt/dotenv package. The functions for fetching places and weather data then can just use a variable name for the API keys.

Here is the end of my explanation. I must compromise to write in english for better writing speed as the deadline is getting closer

## Demo

For demo visit https://ten-kinoko.vercel.app/
## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
