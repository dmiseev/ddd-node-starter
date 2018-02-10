import { injectable } from "inversify";

@injectable()
class User {
    private id: number;
    private username: string;

    public constructor(id: number, username: string) {
        this.id = id;
        this.username = username;
    }

    public getId(): number {
        return this.id;
    }

    public getUsername(): string {
        return this.username;
    }
}

export default User;