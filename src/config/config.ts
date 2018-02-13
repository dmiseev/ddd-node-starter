import "reflect-metadata";

import { Kernel, injectable, decorate } from 'inversify';

import { PageController } from '../Http/Controllers/PageController';
import { UserController } from '../Http/Controllers/UserController';
import { UserService } from '../Services/UserService';
import { TypeOrmUserRepository } from '../Infrastructure/Domain/TypeOrm/TypeOrmUserRepository';
import { UserRepository } from '../Domain/User/UserRepository';

// set up kernel
let kernel: Kernel = new Kernel();

kernel.bind<UserRepository>('UserRepository').to(TypeOrmUserRepository);

kernel.bind<UserService>('UserService').to(UserService);

kernel.bind<UserController>('UserController').to(UserController);
kernel.bind<PageController>('PageController').to(PageController);

export default kernel;