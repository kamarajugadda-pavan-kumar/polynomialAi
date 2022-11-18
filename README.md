# Uploading , viewing and sharing files in Google Drive using google drive API

The project was developed usign MVC (Models, controllers, views) architecture. The technologies used are Node.js, express.js, EJS, MongoDB, google Drive API. 

## npm packages used in the project include
1. axios __1.1.3__ (_axios is used to make http calls_)
2. connect-mongo __4.6.0__ (_utility that enables us to store the session created in mongoDB_)
3. dotenv __16.0.3__ (_enables to read the environment varibales _)
4. ejs __3.1.8__ (_Embedded javascript templeting is used to render dynamic web pages and views_)
5. express __4.18.2__ (_framework used to ease the task of building server_)
6. express-ejs-layouts __2.5.1__ (_ejs_layouts helps in making layouts making the ejs templeting code less repetitive.Elements such as header, sidebar , navbar etc can be written in layout and can be used in rest of the application_)
7. express-session __1.17.3__ (_after authenticating the user, the user data is stored in a session in MongoDB. Express-session helps in carrying out this functionality_)
8. google-auth-library __8.7.0__ 
9. googleapis __109.0.1__ (_provides with all the apis required to interact with the google services, in this case its the google drive_)
10. laravel-mix __6.0.49__ (_scss and javascript written in the resources folder is ccompiled by laravel-mix to make it available in the public folder_)
11. mime-types __2.1.35__ (_used to know the file type that is being uploaded_)
12. mongoose __6.7.2__ (_mongoose gives the client required to interact with mongodb_)
13. multer __1.4.5-lts.1__ (_used to parse the multiform part data that is getting uploaded by the client_)
14. passport __0.6.0__ (_authntication library _)
15. passport-google-oauth20 __2.0.0__ (_google strategy is used to obtain the profile and access token to further interact with the google drive API_)

## running the application
1. clone the repo and install the packages using `npm i`
2. The scss and js files are already compiled into the public folder. However if you wish to compile it again , you can use command `npx mix watch`
3. Then start the project using command `npm start`. The project will be running on PORT 3000 by default. 
4. start up screen on __localhost:3000__
<img width="1440" alt="image" src="https://user-images.githubusercontent.com/32819459/202649489-d903b9e7-985f-4c68-94c3-2a64a71cf7c1.png">
5. Video demonstration of how the app works
https://youtu.be/oEIGc70u4o0


## File structure of the project

```bash
|__app
|   |
|   |__config
|   |     |
|   |     |__assests.js
|   |     |__ejsConfig.js
|   |     |__errorHandler.js
|   |     |__passport.js
|   |
|   |__http
|   |     |
|   |     |__controllers
|   |     |       |__pageControllers.js
|   |     |       |__readFilesControllers.js
|   |     |       |__shareFileController.js
|   |     |       |__uploadControllers.js
|   |     |__middlewares
|   |             |__isUserLoggedIn.js
|   |             |__pageNotFound.js
|   |__models
|         |__user.js
|
|
|__node_modules
|
|
|
|__public
|   |
|   |__css
|   |     |__app.css
|   |     
|   |__imgs     
|   |     |__chicken N corn Delight.jpeg
|   |     |__drive.png
|   |
|   |__js
|         |__app.js
|
|
|__resources
|   |
|   |__js
|   |     |__app.js
|   |
|   |__scss
|   |     |__app.scss
|   |
|   |__views
|         |__404.ejs
|         |__home.ejs
|         |__layout.ejs
|         |__shareFile.ejs
|         |__upload.ejs
|         |__viewFiles.ejs
|
|__routes
|   |__api.js
|   |__web.js
|
|__.env
|__.gitignore
|__index.js
|__mix-manifest.json
|__package-lock.json
|__package.json
|__plan.txt
|__webpack.mix.js
```


<!-- app folder consistists of configuration for the app, models , controllers- -->
[+]app
    [+]config
    [+]http
        [+]controllers
            [.]otpController.js
            [.]pageControllers.js
        [+]middlewares
    [+]models  
        [.]message.js

<! node_modules contains all the supporting packages installed from npm repository>
[+]node_modules

<! public folder will be accessible by the client, it consits of all the css, images , js>
[+]public
    [+]css
        [.]app.css
    [+]imgs
        [.]otp-icon.png
    [+]js
        [.]app.js 

<!  EJS templating is used to create views and scss, tailwind css is used to syle>
[+]resources
    [+]js 
        [+]app.js
    [+]scss
        [.]_variables.scss 
        [.]app.scss
    [+]views
        [.]contactInfo.ejs
        [.]contacts.ejs
        [.]home.ejs 
        [.]layout.ejs 
        [.]messages.ejs 
        [.]sendOTP.ejs
        [.]404.ejs

<! all the routes created in this express app is divided into two parts . one that renders EJS file(web.js) and other gives data response(api.js) >
[+]routes
    [.]api.js 
    [.]web.js 

