const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));

const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.cert', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
    console.log(`Serwer HTTPS działa na porcie ${port}`);
});
