import { ObjectId } from "mongoose"

export default interface InsertReturnType{
        status: string;
        _id: ObjectId,
}