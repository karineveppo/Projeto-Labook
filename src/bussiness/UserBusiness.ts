import { UserDatabase } from "../database/UserDatabase"
import { SignupInputDTO, SignupOutputDTO } from "../dtos/userDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { ROLE_USERS, TokenPayLoad } from "../types";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) {}

    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const { name, email, password } = input

        if(typeof name !== "string") {
            throw new BadRequestError ("O 'name', deve ser uma string!")
        }

        if(typeof email !== "string") {
            throw new BadRequestError ("O 'email', deve ser uma string!")
        }

        if(typeof password !== "string") {
            throw new BadRequestError ("O 'password', deve ser uma string!")
        }

        const id = this.idGenerator.generate()
        const hashedPassword = await this.hashManager.hash(password)

        const newUser = new User(
            id,
            name,
            email,
            hashedPassword,
            ROLE_USERS.USER,
            new Date().toISOString()
        )

        const UserDB = newUser.toDBModel()

        await this.userDatabase.insert(UserDB)

        const payload: TokenPayLoad = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: SignupOutputDTO = {
            token: token
        } 

        return output
    }
    

}