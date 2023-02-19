import { UserDatabase } from "../database/UserDatabase"
import { loginInputDTO, LoginOutputDTO , SignupInputDTO, SignupOutputDTO } from "../dtos/userDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { ROLE_USERS, TokenPayLoad, UserDB } from "../types";

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

    public login = async (input: loginInputDTO): Promise<LoginOutputDTO> => {
        const { email, password } = input

        if(typeof email !== "string") {
            throw new BadRequestError ("O 'email', deve ser uma string!")
        }

        if(typeof password !== "string") {
            throw new BadRequestError ("O 'password', deve ser uma string!")
        }

        const userDB: UserDB | undefined = await this.userDatabase.findByEmail(email)
        
        if(!userDB) {
            throw new NotFoundError("Hum...Este'email' não está cadastrado!")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )
        const hashedPassword = user.getPassword()

        const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)
        
        if(!isPasswordCorrect) {
            throw new BadRequestError("Hum...Este 'password' está incorreto!")
        }

        const payload: TokenPayLoad = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: LoginOutputDTO = {
            token
        }
        return output
    }
}