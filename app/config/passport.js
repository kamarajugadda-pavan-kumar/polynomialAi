// var GoogleStrategy = require("passport-google-oidc");
// var GoogleStrategy = require("passport-google-oauth2").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

function init(passport) {
  //   passport.use(
  //     new GoogleStrategy(
  //       {
  //         clientID: process.env.CLIENT_ID,
  //         clientSecret: process.env.SECRET,
  //         callbackURL: "/oauth2/redirect/google",
  //         scope: ["profile"],
  //       },
  //       function verify(issuer, profile, cb) {
  //         console.log(issuer, profile);
  //         var user = {
  //           id: profile.id,
  //           name: profile.displayName,
  //         };
  //         return cb(null, user);
  //         // db.get(
  //         //   "SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?",
  //         //   [issuer, profile.id],
  //         //   function (err, row) {
  //         //     if (err) {
  //         //       return cb(err);
  //         //     }
  //         //     if (!row) {
  //         //       db.run(
  //         //         "INSERT INTO users (name) VALUES (?)",
  //         //         [profile.displayName],
  //         //         function (err) {
  //         //           if (err) {
  //         //             return cb(err);
  //         //           }

  //         //           var id = this.lastID;
  //         //           db.run(
  //         //             "INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)",
  //         //             [id, issuer, profile.id],
  //         //             function (err) {
  //         //               if (err) {
  //         //                 return cb(err);
  //         //               }
  //         //               var user = {
  //         //                 id: id,
  //         //                 name: profile.displayName,
  //         //               };
  //         //               return cb(null, user);
  //         //             }
  //         //           );
  //         //         }
  //         //       );
  //         //     } else {
  //         //       db.get(
  //         //         "SELECT * FROM users WHERE id = ?",
  //         //         [row.user_id],
  //         //         function (err, row) {
  //         //           if (err) {
  //         //             return cb(err);
  //         //           }
  //         //           if (!row) {
  //         //             return cb(null, false);
  //         //           }
  //         //           return cb(null, row);
  //         //         }
  //         //       );
  //         //     }
  //         //   }
  //         // );
  //       }
  //     )
  //   );

  //   passport.use(
  //     new GoogleStrategy(
  //       {
  //         clientID: process.env.CLIENT_ID,
  //         clientSecret: process.env.SECRET,
  //         callbackURL: "http://localhost:3000/oauth2/redirect/google",
  //         passReqToCallback: true,
  //         scope: ["profile", "email"],
  //       },
  //       function (request, accessToken, refreshToken, profile, done) {
  //         // User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //         //   return done(err, user);
  //         // });
  //         console.log(refreshToken, accessToken, profile);
  //         return done(null, profile);
  //       }
  //     )
  //   );
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.SECRET,
        callbackURL: "http://localhost:3000/oauth2/redirect/google",
        scope: ["profile", "email", "https://www.googleapis.com/auth/drive"],
      },
      function (accessToken, refreshToken, profile, cb) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
        // console.log(refreshToken, accessToken, profile);
        return cb(null, { profile, accessToken });
      }
    )
  );

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, {
        id: user.profile.id,
        username: user.profile.displayName,
        email: user.profile.emails[0].value,
        accessToken: user.accessToken,
      });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
}

module.exports = init;
