module.exports = (app) => {

    app.use('/', require("../routes/home.routes"));
    app.use('/animals', require('../routes/animal.routes'));
    app.use('/auth', require('../routes/auth.routes'));
    app.use('/users/levels', require('../routes/userlevel.routes'));
    app.use('/users', require('../routes/user.routes'));
    app.use('/emails', require('../routes/email.routes'));
    app.use('/dailyregistries', require('../routes/dayRegistry.routes'));
    app.use('/patients', require('../routes/patient.routes'));
}