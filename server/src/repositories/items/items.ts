import { Prisma, items } from "@prisma/client";
import { IsNotEmpty } from "class-validator";
import { validateClassFields } from "../utils";
import { prisma } from "../../app";
import { logInfo, logError } from "../../logging/utils";

export class Item {
  id!: number;

  @IsNotEmpty()
  menu_id!: number;

  @IsNotEmpty()
  name_eng!: string;

  @IsNotEmpty()
  name_chn!: string;

  @IsNotEmpty()
  price!: number;

  @IsNotEmpty()
  category!: number;
}

export async function getAllItems(): Promise<Record<string, unknown>[]> {
  try {
    const allItems = await prisma.items.findMany({
      orderBy: [
        {
          id: "asc",
        },
      ],
    });
    logInfo(getAllItems.name, `[✓]`)
    return allItems;
  } catch (err) {
    logInfo(getAllItems.name, `[✗] ${err}`)
    throw err;
  }
}

export async function getOneItem(id: number): Promise<items> {
  try {
    const oneItem = await prisma.items.findUnique({
      where: {
        id: id,
      },
    });
    if (oneItem !== null) {
      await validateClassFields(Item, <JSON>(<unknown>oneItem));
      return oneItem;
    }
    logInfo(getOneItem.name, `[✓] Item Record ID:${id} retrieved.`)
    return <items>(<unknown>[]);
  } catch (err) {
    logInfo(getOneItem.name, `[✗] ${err}`)
    throw err;
  }
}

export async function createItem(body: JSON) {
  try {
    await validateClassFields(Item, body);
    const res = await prisma.items.create({
      data: <Prisma.itemsCreateInput>body,
    });
    logInfo(createItem.name, `[✓] Item Created: {id: ${res.id}, price: ${res.price}, name_eng: ${res.name_eng}, name_chn: ${res.name_chn}, category: ${res.category}}`)
  } catch (err) {
    logError(createItem.name, err, `[✗]`);
    throw new Error(`${err} `);
  }
}

export async function deleteOneItem(id: number): Promise<void> {
  try {
    const res = await prisma.items.delete({
      where: { id: id },
    });
    logInfo(deleteOneItem.name, `[✓] Item Deleted: {id: ${res.id}, price: ${res.price}, name_eng: ${res.name_eng}, name_chn: ${res.name_chn}, category: ${res.category}}`)
  } catch (err) {
    logError(deleteOneItem.name, err, `[✗]`);
    throw new Error(`${err} `);
  }
}

export async function updateItem(
  id: number,
  item: Prisma.itemsUpdateInput
): Promise<void> {
  try {
    const res = await prisma.items.update({
      where: { id: id },
      data: {
        name_eng: item.name_eng,
        name_chn: item.name_chn,
        price: item.price,
        menu_id: item.menu_id,
        category: item.category,
      },
    });
    logInfo(updateItem.name, `[✓] Item Updated: {id: ${res.id}, price: ${res.price}, name_eng: ${res.name_eng}, name_chn: ${res.name_chn}, category: ${res.category}}`)
  } catch (err) {
    logError(updateItem.name, err, `[✗]`);
    throw new Error(`${err} `);
  }
}
