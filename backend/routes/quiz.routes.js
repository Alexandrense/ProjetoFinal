const express = require('express');
let router = express.Router();
const QuizController = require('../controllers/quiz.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, QuizController.get)
    .post(AuthController.checkAuth, [
        body('name').isString(),
        body('birth_date').isISO8601(),
        body('sex').isString(),
        body('contactName').isString(),
        body('contactPhone').isString(),
        body('contactMail').isString(),
        body('users.*').isMongoId()
    ], QuizController.create);

router.route("/deactivate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], QuizController.deactivate);

router.route("/activate/:id")
    .put(AuthController.checkAuth, [param("id").isMongoId()], QuizController.activate);

router.route('/:id')
    .get(AuthController.checkAuth, [param("id").isMongoId()], QuizController.getOne)
    .put(AuthController.checkAuth, [param("id").isMongoId()], QuizController.update)
    .delete(AuthController.checkAuth, [param("id").isMongoId()], QuizController.delete);

module.exports = router;