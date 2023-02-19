import { GetPostsOutputDTO, CreatePostInputDTO } from './../dtos/userDTO';
import { PostDatabase } from "../database/PostDatabase";
import { GetPostsInputDTO } from "../dtos/userDTO";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { BadRequestError } from '../errors/BadRequestError';
import { postWithCreatorDB } from '../types';
import { Post } from '../models/Post';

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
    ) {}

    public getPosts = async (input: GetPostsInputDTO): Promise<GetPostsOutputDTO> => {
        const { token } = input

        if(token === undefined) {
            throw new BadRequestError ("Ops! Token inesistente!!")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null) {
            throw new BadRequestError ("Ops!...token inválido ou inesistente!!")
        }

        const postsWithCreatorsDB: postWithCreatorDB[] = await this.postDatabase.getPostsWithCreators()

        const posts = postsWithCreatorsDB.map((
            postwithCreatorDB) => {
                const post = new Post(
                    postwithCreatorDB.id,
                    postwithCreatorDB.content,
                    postwithCreatorDB.likes,
                    postwithCreatorDB.dislikes,
                    postwithCreatorDB.created_at,
                    postwithCreatorDB.updated_at,
                    postwithCreatorDB.creator_id,
                    postwithCreatorDB.name
                )

                return post.toBussinessModel()
            }
        )

        const output: GetPostsOutputDTO = posts

        return output
    }

    public createPost = async (input: CreatePostInputDTO): Promise<void> => {
        const { token, content } = input

        if(token === undefined) {
            throw new BadRequestError ("Ops! Token inesistente!!")
        }

        const payload = this.tokenManager.getPayload(token)

        if(payload === null) {
            throw new BadRequestError ("Ops!...token inválido ou inesistente!!")
        }

        if(typeof content !== "string") {
            throw new BadRequestError(" O 'content' deve ser string!")
        }

        const id = this.idGenerator.generate()
        const createdAt = new Date().toISOString()
        const updatedAt = new Date().toISOString()
        const creatorId = payload.id
        const creatrorName = payload.name

        const post = new Post(
            id,
            content,
            0,
            0,
            createdAt,
            updatedAt,
            creatorId,
            creatrorName
        )

        const postDB = post.toDBModel()

        await this.postDatabase.insert(postDB)
    }
}