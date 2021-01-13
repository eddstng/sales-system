import { itemsCreateInput, items } from "@prisma/client";
import { IsNotEmpty } from "class-validator";
import { validateClassFields } from "../utils";
import { prisma } from '../../app'
import { logInfo, logError } from '../../logging/utils'

class Item {
    id!: number;

    @IsNotEmpty()
    price!: number;

    @IsNotEmpty()
    name_eng!: string;

    @IsNotEmpty()
    name_chn!: string;
}

export async function getAllItems(): Promise<Record<string, unknown>[]> {
    try {
        const allItems = await prisma.items.findMany()
        logInfo(getAllItems.name, `[✓]`)
        return allItems;
    } catch (err) {
        logInfo(getAllItems.name, `[✗] Error: ${err}`)
        throw new Error(`${err}`)
    }
}

export async function getOneItem(id: number): Promise<items> {
    try {
        const oneItem = await prisma.items.findUnique({
            where: {
                id: id,
            },
        })
        if (oneItem !== null) {
            await validateClassFields(Item, <JSON><unknown>oneItem)
            return oneItem
        }
        logInfo(getOneItem.name, `[✓] Item Record ID:${id} retrieved.`)
        return <items><unknown>[]
    } catch (err) {
        logInfo(getOneItem.name, `[✗] Error: ${err}`)
        throw new Error(`${err}`)
    }
}

export async function createItem(body: JSON) {
    try {
        await validateClassFields(Item, body)
        const res = await prisma.items.create({ data: <itemsCreateInput>body })
        logInfo(createItem.name, `[✓] Item Created: {id: ${res.id}, price: ${res.price}, name_eng: ${res.name_eng}, name_chn: ${res.name_chn}`)
    } catch (err) {
        logError(createItem.name, err, `[✗]`);
        throw new Error(`${err} `)
    }
}

export async function deleteOneItem(id: number): Promise<void> {
    try {
        const res = await prisma.items.delete({
            where: { id: id },
        })
        logInfo(deleteOneItem.name, `[✓] Item Deleted: {id: ${res.id}, price: ${res.price}, name_eng: ${res.name_eng}, name_chn: ${res.name_chn}`)
    } catch (err) {
        console.log(err)
        logError(deleteOneItem.name, err, `[✗]`);
        throw new Error(`${err} `)
    }
}