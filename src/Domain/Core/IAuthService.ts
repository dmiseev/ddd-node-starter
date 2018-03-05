import { SignInDTO } from '../../Infrastructure/DTO/Auth/SignInDTO';
import { SignUpDTO } from '../../Infrastructure/DTO/Auth/SignUpDTO';
import { User } from '../User/User';

export interface IAuthService {

    /**
     * @param {SignInDTO} DTO
     * @returns {Promise<any>}
     */
    signIn(DTO: SignInDTO): Promise<any>;

    /**
     * @param {SignUpDTO} DTO
     * @returns {Promise<User>}
     */
    signUp(DTO: SignUpDTO): Promise<User>;
}