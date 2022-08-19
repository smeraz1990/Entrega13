import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function getRoot(req, res) {}

function getLogin(req, res) {
  if (req.isAuthenticated()) {
    var user = req.user;
    console.log("user logueado");
    res.render("login-ok", {
      usuario: user.username
    });
  } else {
    console.log("user NO logueado");
    res.sendFile(path.join(__dirname,"../views/login.html"));
  }
}

function getSignup(req, res) {
  res.sendFile(path.join(__dirname,"../views/signup.html"));
}

function postLogin(req, res) {
  var user = req.user;

  res.sendFile(path.join(__dirname,"../views/index.html"));
}

function postSignup(req, res) {
  var user = req.user;

  res.sendFile(path.join(__dirname,"../views/index.html"));
}

function getFaillogin(req, res) {
  console.log("error en login");
  res.render("login-error", {});
}

function getFailsignup(req, res) {
  console.log("error en signup");
  res.render("signup-error", {});
}

function getLogout(req, res) {
  req.logout();
  res.sendFile(path.join(__dirname,"../views/index.html"));
}

function failRoute(req, res) {
  res.status(404).render("routing-error", {});
}

export default {
  getRoot,
  getLogin,
  postLogin,
  getFaillogin,
  getLogout,
  failRoute,
  getSignup,
  postSignup,
  getFailsignup,
};
