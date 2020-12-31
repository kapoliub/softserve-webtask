const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("./models/users.model");

passport.serializeUser((user, done) => {
    console.log('Сериализация', user);
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
    console.log('Десериализация', id);
  Users.findById(id, (id, user) => {
    const admin = user._id === id ? user : false;
    done(null, admin);
  });
});

passport.use(
  new LocalStrategy({ usernameField: "mail" }, (mail, password, done) => {
    Users.findOne({ role: "admin" }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user.mail === mail && user.password === password) {
        return done(null, user);
      }
      return done(null, false);
    });
  })
);
