//express = framework pt nodejs
//cors = cross origin for resource sharing permite request-urilor de ajax sa sara peste aceleasi origin policy and access resources from remote host cors detine un express middleware ce ne permite sa accesam ceva in afara serverului nostru
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

//cum se creeaza un server de express pe portul 5000
const app = express();
const port = process.env.PORT || 5000;

//cors middleware si middleware-ul care ne permite sa
//parsam json pentru serverul trimite si primeste json
app.use(cors());
app.use(express.json());

connectDB();

//dau import a fisierele din routes
const routes = require('./routes');

//cand se acceseara localhost/users se va incarca tot ce se foloseste in usersRouter
app.use('/movieflex', routes);

// handler de erori declarat ca middleware
app.use((err, req, res, next) => {
    console.trace(err);
    let status = 500;
    let message = 'Something Bad Happened';
    if (err.httpStatus) {
        status = err.httpStatus;
        message = err.message;
    }
    res.status(status).json({
        error: message,
    });
});

//portneste ascultarea serverului pe portul de mai sus
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})