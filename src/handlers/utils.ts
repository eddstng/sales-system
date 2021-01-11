import { plainToClass } from "class-transformer"
import { validate } from "class-validator"
import { ClassType } from "class-transformer/ClassTransformer"

export async function validateClassFields<T>(cls: ClassType<T>, body: JSON): Promise<void> {
    const obj = plainToClass(cls, body)
    const x = await validate(obj)
    if (x.length != 0) {
        throw new Error(`${x}`)
    }
    return
}