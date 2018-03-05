import "reflect-metadata";

import { Container } from 'inversify';

import TYPES from './types';
import { UserController } from '../Http/Controllers/UserController';
import { UserService } from '../Infrastructure/Services/UserService';
import { TypeOrmUserRepository } from '../Infrastructure/Domain/TypeOrm/TypeOrmUserRepository';
import { UserRepository } from '../Domain/User/UserRepository';
import { AuthService } from '../Infrastructure/Services/AuthService';
import { ImageRepository } from '../Domain/Image/ImageRepository';
import { TypeOrmImageRepository } from '../Infrastructure/Domain/TypeOrm/TypeOrmImageRepository';
import { HomeController } from '../Http/Controllers/HomeController';
import { SignInController } from '../Http/Controllers/Auth/SignInController';
import { SignUpController } from '../Http/Controllers/Auth/SignUpController';
import { IUserService } from '../Domain/User/IUserService';
import { IAuthService } from '../Domain/Core/IAuthService';

let container: Container = new Container();

container.bind<UserRepository>('UserRepository').to(TypeOrmUserRepository);
container.bind<ImageRepository>('ImageRepository').to(TypeOrmImageRepository);

container.bind<IUserService>('IUserService').to(UserService);
container.bind<IAuthService>('IAuthService').to(AuthService);

container.bind<HomeController>(TYPES.Controller).to(HomeController);
container.bind<UserController>(TYPES.Controller).to(UserController);
container.bind<SignInController>(TYPES.Controller).to(SignInController);
container.bind<SignUpController>(TYPES.Controller).to(SignUpController);

export default container;