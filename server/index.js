const __express = require('express');
const { Client } = require('pg');
const __cors = require('cors');
const __colors = require('colors');
const __config = require('./src/config');
const __queries = require('./src/db');

const app = __express();
const client = new Client(__config().db)

app.use(__cors());

app.listen(__config().server.server_port, () => {
    console.log(`Server has been started on ` + __colors.green(`http://localhost:${__config().server.server_port}`));
    client.connect().then(() => {
        console.log(`Successfully connected to database ${__config().db.database} on port ${__config().db.port}`);
    }).catch(obj => {
        console.log('Error Connection', obj)
    })
    // client.query(`SELECT student.id, student.surname, student.name, student.second_name, sg.name FROM STUDENT inner join study_group sg on student.study_group_id = sg.id`, (err, results) => {
    //     console.log(results.rows);
    // })
    // client.query(__queries().query, (err, results) => {
    //     console.log(results);
    // })
});