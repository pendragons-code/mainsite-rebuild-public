# Rebuild-MainSite:
This is a rebuild of my personal site. This rebuild has quite a lot of configurations removed, meaning that you are expected to come up with some of your own things like api keys and more!


# Hey there:
If you found this a little helpful, consider [donating](https://ko-fi.com/pendragonscode). <3

# How to run:
```
git clone https://github.com/pendragons-code/mainsite-rebuild-public
cd mainsite-rebuild-public
npm i
npm run start
```

# first time set up:
- download this repository
- unzip and enter the directory
- copy the file `.env.example` and rename it (`.env.example copied`) to `.env.production`
- open the folder in visual studio code
- sign up for an api key for the thing
- put the api key inside the environment file
- run `npm run start`)

# environment file:
[sign up for an api key here](https://rapidapi.com/MeteosourceWeather/api/ai-weather-by-meteosource/)

# TODO:
So when I made the refresh article cache component, It would appear that I was drunk (namely that I made a really dumb algorithm and somehow I was too tired to realize my error). Therefore, I will revamp the whole system for article fetching as it is kinda dumb. (will probably use sets or something with less loops honestly wth).<br><br>

Honestly the changes I just made are not a solution and are a sticky tape holding the plane wings and body together.