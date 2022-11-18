# Uploading , viewing and sharing files in Google Drive using google drive API

The project was developed usign MVC (Models, controllers, views) architecture. 

npm packages used in the project include
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


