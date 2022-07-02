# Experience Composer Gamer Stream Sample Web Application

The sample application allows a video game streamer to join an OpenTok session and send the URL of their livestream to be used as host for the Experience Composer. This allows the streamer to act as the publisher with their video in the top left corner, and the livestream to be published in the center via Experience Composer. 

<img alt="Main Page of Sample Application" src="screenshots/mainpage.png" />

In order to archive the web application including its CSS elements and layout, a new session and Experience Composer will need to be created by pressing the Start Archiving EC button. This new Experience Composer will subscribe to the original session and publish to the new session which will be archived and visible in the View Past Archives tab. 

## Local Installation
1. Clone the repository

2. Install all dependencies: `npm install`

3. Add your own api key and api secret or add environment variables

4. Run the server side using: `npm run dev`

5. Run the client side using: `npm start`

Open https://localhost:3000 in web browser



