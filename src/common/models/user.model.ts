import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";
import { UserRole } from "src/global/type/user";
@Table({tableName: "users"})
export class User extends Model {
    @Column
    username: string

    @Column
    email: string

    @Column
    password: string

    @Column({
        type:DataTypes.ENUM(...Object.values(UserRole)),
        defaultValue: UserRole.USER
    })
    role: UserRole
}