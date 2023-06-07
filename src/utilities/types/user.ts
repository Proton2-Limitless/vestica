export enum UserRole {
    USER = "user",
    ADMIN = "admin"
}

export interface IUser {
    id?: string
    email: string
    firstName: string
    lastName: string
    password: string
    role: UserRole
}