export enum ROLE_USERS {
    ADMIN = "ADMIN",
    USER = "USER"
}

export interface UserDB {
    id: string,
    name:string,
    email: string,
    password: string,
    role: ROLE_USERS,
    created_at: string
}

export interface UserModel {
    id: string,
    name: string,
    email:string,
    password: string,
    role: ROLE_USERS,
    createdAt: string
}

export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}

export interface PostModel {
    id: string,
    content: String,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        name: string
    }
}

export interface CreatePostDB {
    id: string,
    creator_id: string,
    content: string
}

export interface likes_dislikesDB {
    user_id: string,
    post_id: string,
    like: number
}
