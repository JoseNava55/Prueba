import User from "../models/User.js";
import passport from "passport";

export const renderSignUpForm = (req, res) => res.render("signup");

export const signup = async (req, res) => {
  let errors = [];
  const { nombre, email, password, telefono} = req.body;

  if (password.length < 4) {
    errors.push({ text: "La contraseña debe tener mas de 4 caracteres." });
  }

  if (errors.length > 0) {
    return res.render("signup", {
      errors,
      nombre,
      email,
      password,
      telefono,
    });
  }

  // Look for email coincidence
  const userFound = await User.findOne({ email: email });
  if (userFound) {
    req.flash("error_msg", "Este email ya esta en uso.");
    return res.redirect("/signup");
  }

  // Saving a New User
  const newUser = new User({ nombre,telefono, email, password });
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();
  req.flash("success_msg", "Registrado correctamente.");
  res.redirect("/signin");
};

export const renderSigninForm = (req, res) => res.render("signin");

export const signin = passport.authenticate("local", {
  successRedirect: "/notes",
  failureRedirect: "/signin",
  failureFlash: true,
});

export const logout = async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "Ya no estas logeado.");
    res.redirect("/signin");
  });
};
