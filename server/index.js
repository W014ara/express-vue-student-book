const __express = require('express');
const __cors = require('cors');
const __colors = require('colors');
const __config = require('./src/config');
const __userrouter = require('./src/route/route');

const app = __express();
app.use(__cors());
app.use(__express.json());
app.use(__userrouter);

app.listen(__config.server.server_port, () => {
    console.log(`Server has been started on ` + __colors.green(`http://localhost:${__config.server.server_port}`));
});