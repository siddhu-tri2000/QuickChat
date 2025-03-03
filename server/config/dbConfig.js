const mongoose = require('mongoose');

//connection logic
mongoose.connect(process.env.CONN_STRING);

//connection state
const db = mongoose.connection;
db.on('connected', () => {
    console.log("DB is success");
});

db.on('err', () => {
    console.log("DB connection failed");
});


module.exports = db