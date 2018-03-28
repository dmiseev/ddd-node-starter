import { injectable } from 'inversify';
import { IFixtureService } from '../../Domain/Core/IFixtureService';
import { EntityManager, getManager } from 'typeorm';
import { User } from '../../Domain/User/User';
import { Image } from '../../Domain/Image/Image';
import { FriendRequest } from '../../Domain/FriendRequest/FriendRequest';
import { UserFactory } from '../../database/fixtures/UserFactory';

@injectable()
export class FixtureService implements IFixtureService{

    private entityManager: EntityManager;

    constructor() {
        this.entityManager = getManager();
    }

    public clear(): void {

        this.entityManager.clear(FriendRequest)
            .then(() => {
                console.log('Table `friend_requests` successfully cleared.');
            });

        this.entityManager.clear(Image)
            .then(() => {
                console.log('Table `images` successfully cleared.');
            });

        this.entityManager.clear('users_friends')
            .then(() => {
                console.log('Table `users_friends` successfully cleared.');
            });

        this.entityManager.createQueryBuilder(User, 'u')
            .select('u')
            .where('u.deletedAt IS NULL')
            .getMany()
            .then((users: User[]) => {

                users.forEach((user: User) => {
                    user.remove();
                    this.entityManager.save(user)
                        .then(() => {
                            console.log('User with ID # ' + user.id + ' from table `users` successfully removed.');
                        });
                });
            });
    }

    public setUp(): void {

        let users = UserFactory.fakeUsers();

        users.forEach((user: User) => {

            this.entityManager.save(user)
                .then(() => {
                    console.log('User with ID # ' + user.id + ' in table `users` successfully created.');
                });
        })
    }
}