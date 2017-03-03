// The application entry where we set up our server
const http = require('http');
const app = require('../server'); // express app we created

const port = parseInt(process.env.PORT, 10) || 6000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

