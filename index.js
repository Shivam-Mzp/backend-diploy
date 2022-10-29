#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require("./server");
const http = require("http");
const env = require("./env");

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || env.PORT);
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => {
    console.log("Server Listening PORT:", port);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
