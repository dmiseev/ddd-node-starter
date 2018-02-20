import "reflect-metadata";

import { Kernel } from 'inversify';

import { PageController } from '../Http/Controllers/PageController';
import { UserController } from '../Http/Controllers/UserController';
import { AuthController } from '../Http/Controllers/AuthController';
import { UserService } from '../Services/UserService';
import { TypeOrmUserRepository } from '../Infrastructure/Domain/TypeOrm/TypeOrmUserRepository';
import { UserRepository } from '../Domain/User/UserRepository';
import { AuthService } from '../Services/AuthService';

// set up kernel
let kernel: Kernel = new Kernel();

kernel.bind<UserRepository>('UserRepository').to(TypeOrmUserRepository);

kernel.bind<UserService>('UserService').to(UserService);
kernel.bind<AuthService>('AuthService').to(AuthService);

kernel.bind<UserController>('UserController').to(UserController);
kernel.bind<PageController>('PageController').to(PageController);
kernel.bind<AuthController>('AuthController').to(AuthController);

export default kernel;