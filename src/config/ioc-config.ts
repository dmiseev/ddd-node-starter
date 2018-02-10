import "reflect-metadata";

import { Kernel } from 'inversify';

import { PageController } from '../controllers/page-controller';
import { UserController } from '../controllers/user-controller';
import { UserService } from '../services/user-service';

// set up kernel
let kernel: Kernel = new Kernel();

kernel.bind<UserService>('UserService').to(UserService);
kernel.bind<UserController>('UserController').to(UserController);
kernel.bind<PageController>('PageController').to(PageController);

export default kernel;