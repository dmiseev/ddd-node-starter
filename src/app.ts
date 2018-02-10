import "reflect-metadata";
import { Server } from './framework/server';
import { default as kernel } from './config/ioc-config';

// create server
let server = new Server(kernel);
const port = process.env.PORT || 3000;

server
    .build()
    .listen(port, 'localhost', callback);

function callback() {
    console.log('listening on http://localhost:' + port);
}