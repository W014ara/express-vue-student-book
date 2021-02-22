const __express = require('express');
const __cors = require('cors');
const __colors = require('colors');
const __config = require('./src/config');
const __userrouter = require('./src/route/route');

const app = __express();
app.use(__cors());
app.use(__express.json());
app.use(__userrouter);

app.use(__express.static(__dirname + '/src/main/resources/static'));

app.get('/', function(req, res){
    res.sendFile('index.html', { root: __dirname });
});

app.listen(__config.server.server_port, () => {
    console.log(`Server has been started on ` + __colors.green(`http://localhost:${__config.server.server_port}`));
});