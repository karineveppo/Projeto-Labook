import express from "express"
import { PostBusiness } from "../bussiness/PostBusiness"
import { PostController } from "../controller/PostController"
import { PostDatabase } from "../database/PostDatabase"
import { IdGenerator } from './../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'

export const postPouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

postPouter.get("/", postController.getPosts)
