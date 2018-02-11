import "reflect-metadata";
import {createConnection} from "typeorm";
import { Server } from './framework/server';
import { default as kernel } from './config/config';

createConnection().then(async connection => {

    // create server
    let server = new Server(kernel);
    const port = process.env.PORT || 3000;

    server
        .build()
        .listen(port, 'localhost', callback);

    function callback() {
        console.log('listening on http://localhost:' + port);
    }

}).catch(error => console.log("TypeORM connection error: ", error));

