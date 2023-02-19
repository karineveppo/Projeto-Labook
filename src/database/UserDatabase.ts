import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public static TABLE_USERS = "users"

    public insert = async (UserDB: UserDB) => {
        await BaseDatabase
            .connection(UserDatabase.TABLE_USERS)
            .insert(UserDB)
    }
}