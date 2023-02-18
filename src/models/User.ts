import { ROLE_USERS, UserDB, UserModel } from './../types';

export class User {
    constructor(
        private id: string,
        private name: string,
        private email:string,
        private password: string,
        private role: ROLE_USERS,
        private createdAt: string
    ) {}

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getName(): string {
        return this.name
    }

    public setName(value: string): void {
        this.name = value
    }

    public getEmail(): string {
        return this.email
    }

    public setEmail(value: string): void {
        this.email = value
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword(value: string): void {
        this.password = value
    }

    public getRole(): ROLE_USERS {
        return this.role
    }

    public setRole(value: ROLE_USERS): void {
        this.role = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedeAt(value: string): void {
        this.createdAt = value
    }

    public toDBModel(): UserDB {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            created_at: this. createdAt
        }
    }

    public toBussinessModel(): UserModel {
        return{
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            createdAt: this.createdAt
        }
    }
}
