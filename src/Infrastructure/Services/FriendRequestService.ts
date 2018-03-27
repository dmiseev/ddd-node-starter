import { injectable, inject } from 'inversify';
import { FriendRequest } from '../../Domain/FriendRequest/FriendRequest';
import { FriendRequestRepository } from '../../Domain/FriendRequest/FriendRequestRepository';
import { IFriendRequestService } from '../../Domain/FriendRequest/IFriendRequestService';
import { Pagination } from '../../Domain/Core/Pagination';
import { FriendRequestDTO } from '../DTO/FriendRequest/FriendRequestDTO';
import { User } from '../../Domain/User/User';
import { UserRepository } from '../../Domain/User/UserRepository';
import { UserNotFound } from '../../Domain/User/UserNotFound';
import { FriendRequestNotFound } from '../../Domain/FriendRequest/FriendRequestNotFound';

@injectable()
export class FriendRequestService implements IFriendRequestService {

    constructor(@inject('FriendRequestRepository') private friendRequestRepository: FriendRequestRepository,
                @inject('UserRepository') private userRepository: UserRepository)
    {
        this.friendRequestRepository = friendRequestRepository;
        this.userRepository = userRepository;
    }

    /**
     * @param {number} userId
     * @param {Pagination} pagination
     *
     * @returns {Promise<FriendRequest[]>}
     */
    public bySenderId(userId: number, pagination: Pagination): Promise<[FriendRequest[], number]> {

        return this.friendRequestRepository.bySenderId(userId, pagination);
    }

    /**
     * @param {number} userId
     * @param {Pagination} pagination
     *
     * @returns {Promise<FriendRequest[]>}
     */
    public byReceiverId(userId: number, pagination: Pagination): Promise<[FriendRequest[], number]> {

        return this.friendRequestRepository.byReceiverId(userId, pagination);
    }

    /**
     * @param {number} id
     * @returns {Promise<FriendRequest>}
     */
    public byId(id: number): Promise<FriendRequest> {

        return this.friendRequestRepository.byId(id);
    }

    /**
     * @param {User} sender
     * @param {FriendRequestDTO} DTO
     *
     * @returns {Promise<FriendRequest>}
     */
    store(sender: User, DTO: FriendRequestDTO): Promise<FriendRequest> {

        return this.friendRequestRepository.find(sender.id, DTO.userId)
            .then((friendRequest: FriendRequest) => {

                if (friendRequest) {
                    throw FriendRequestNotFound.waitingAcceptFromReceiver();
                }

                return this.userRepository.byId(DTO.userId)
                    .then((receiver: User) => {

                        if (!receiver) {
                            throw UserNotFound.fromId(DTO.userId);
                        }

                        if (receiver.isFriend(sender)) {
                            throw FriendRequestNotFound.friendExist();
                        }

                        return this.friendRequestRepository.store(
                            FriendRequest.register(sender, receiver)
                        );
                    });
            });
    }

    /**
     * @param {User} user
     * @param {number} id
     *
     * @return {Promise<void>}
     */
    accept(user: User, id: number): Promise<void> {

        return this.friendRequestRepository.byId(id)
            .then((friendRequest: FriendRequest) => {

                if (!friendRequest) {
                    throw FriendRequestNotFound.fromId(id);
                }

                if (user.id !== friendRequest.receiver.id) {
                    throw FriendRequestNotFound.forbidden();
                }

                friendRequest.sender.addFriend(friendRequest.receiver);
                friendRequest.receiver.addFriend(friendRequest.sender);
                friendRequest.remove();

                this.friendRequestRepository.store(friendRequest);
            });
    }

    /**
     * @param {number} id
     * @returns {Promise<void>}
     */
    public remove(id: number): Promise<void> {

        return this.friendRequestRepository.byId(id)
            .then((friendRequest: FriendRequest) => {
                friendRequest.remove();
                this.friendRequestRepository.store(friendRequest);
            });
    }
}