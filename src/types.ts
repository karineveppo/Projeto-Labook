export enum ROLE_USER {
    ADMIN = "ADMIN",
    USER = "USER"
}

export interface UserDB {
    id: string,
    name:string,
    email: string,
    password: string,
    role: ROLE_USER,
    created_at: string
}

export interface PostDB {
    is: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
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
