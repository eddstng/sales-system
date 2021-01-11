import { PrismaClient, itemsCreateInput } from "@prisma/client";
import { IsNotEmpty } from "class-validator";
import { validateClassFields } from "../utils";

class Item {
    id!: number;

    @IsNotEmpty()
    price!: number;

    @IsNotEmpty()
    name_eng!: string;

    @IsNotEmpty()
    name_chn!: string;
}

export async function getAllItems(prisma: PrismaClient): Promise<Record<string, unknown>[]> {
    try {
        const allItems = await prisma.items.findMany()
        return allItems;
    } catch (err) {
        throw new Error(`${err}`)
    }
}

export async function createItem(prisma: PrismaClient, body: JSON) {
    try {
        await validateClassFields(Item, body)
        await prisma.items.create({ data: <itemsCreateInput>body })
    } catch (err) {
        throw new Error(`${err}`)
    }
}