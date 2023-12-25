import bcrypt from "bcrypt";
import localStrategy from "passport-local";
import UserModel, { getUser } from "./db/users.js";

const strategy = localStrategy.Strategy;
const InitPassport = (passport) => {
  const authenticateUser = async (email, password, done) => {
    const user = await getUser(email);
    if (!user) return done(null, false, { msg: "email not found" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return done(null, false, { msg: "wrong password" });
    return done(null, user);
  };

  passport.use(new strategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    UserModel.findById(id)
      .then((user) => {
        if (!user) {
          return done(null, false, { msg: "User not found" });
        }
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  });
};

export default InitPassport;
