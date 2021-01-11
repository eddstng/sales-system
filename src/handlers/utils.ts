import { plainToClass } from "class-transformer"
import { validate } from "class-validator"
import { ClassType } from "class-transformer/ClassTransformer"

export async function validateClassFields<T>(cls: ClassType<T>, body: JSON): Promise<void> {
    const post = plainToClass(cls, body)
    const x = await validate(post)
    if (x.length != 0) {
        throw new Error(`${x}`)
    }
    return
}