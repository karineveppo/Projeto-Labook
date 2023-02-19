import { GetPostsOutputDTO } from './../dtos/userDTO';
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
}