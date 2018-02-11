import "reflect-metadata";

import { Kernel } from 'inversify';

import { PageController } from '../controllers/PageController';
import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';

// set up kernel
let kernel: Kernel = new Kernel();

kernel.bind<UserService>('UserService').to(UserService);
kernel.bind<UserController>('UserController').to(UserController);
kernel.bind<PageController>('PageController').to(PageController);

export default kernel;