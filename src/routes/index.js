import { Router } from "express"
import Task from "../models/Task";
import { renderTasks, createTask,aboutTask, renderTaskEdit, editTask, delteTask, doneTask, renderIndex } from "../controllers/tasks.controller";
const router = Router();
import {renderSignUpForm,signup,renderSigninForm,signin,logout} from "../controllers/user.controller.js"

const passport= require('passport');

router.get("/", renderIndex);

router.get("/notes", isAuthenticated,renderTasks);

router.post("/tasks/add",isAuthenticated,createTask) ;

router.get("/about",aboutTask);

router.get("/edit/:id",isAuthenticated,renderTaskEdit);

router.post("/edit/:id",isAuthenticated,editTask,);

router.get("/delete/:id",isAuthenticated,delteTask,);

router.get("/taggdone/:id",doneTask);

router.get("/signup",renderSignUpForm);

router.post("/signup", signup);

router.get("/signin", renderSigninForm);

router.post("/signin", signin);

router.get("/logout", logout);


function isAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Usted no esta autorizado.");
    res.redirect("/signin");
  };


export default router;