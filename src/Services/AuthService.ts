import { injectable, inject } from 'inversify';
import { UserRepository } from '../Domain/User/UserRepository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../Domain/User/User';
import { UserNotFound } from "../Domain/User/UserNotFound";
import { SignInDTO } from "../Infrastructure/DTO/Auth/SignInDTO";
import { SignUpDTO } from "../Infrastructure/DTO/Auth/SignUpDTO";

@injectable()
export class AuthService {

    constructor(@inject('UserRepository') private userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    /**
     * @param {SignInDTO} DTO
     */
    public signIn(DTO: SignInDTO) {

        return this.userRepository.byEmail(DTO.email).then((user: User) => {

            if (bcrypt.compareSync(DTO.password, user.password)) {
                return {token: jwt.sign({id: user.id}, process.env.JWT_SECRET)};
            }

            throw UserNotFound.authorized();
        });

    }

    /**
     * @param {SignUpDTO} DTO
     *
     * @returns {Promise<User>}
     */
    public signUp(DTO: SignUpDTO) {

        let user = User.register(
            DTO.email,
            bcrypt.hashSync(DTO.password, bcrypt.genSaltSync(10)),
            DTO.firstName,
            DTO.lastName
        );

        return this.userRepository.store(user);
    }

    /**
     * @param {string} email
     * @param {string} password
     */
    public refresh(email: string, password: string) {

        // TODO: implement it
    }


}