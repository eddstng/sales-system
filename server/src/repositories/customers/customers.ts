import { IsNotEmpty, IsString, IsOptional } from "class-validator";
import { validateClassFields } from "../utils";
import { prisma } from '../../app'
import { logInfo, logError } from '../../logging/utils'
import { customers } from "@prisma/client";
import { Prisma } from '@prisma/client';

export class Customer {
    id!: number;

    name?: string;

    @IsNotEmpty()
    phone!: string;

    address?: string;

    @IsOptional()
    note?: string | null;
}

export async function getAllCustomers(): Promise<Record<string, unknown>[]> {
    try {
        const allCustomers = await prisma.customers.findMany(
            {
                orderBy: [
                    {
                        id: 'asc',
                    },
                ]
            }
        )
        logInfo(getAllCustomers.name, `[✓]`)
        return allCustomers;
    } catch (err) {
        logInfo(getAllCustomers.name, `[✗] ${err}`)
        throw err;
    }
}

export async function getOneCustomer(id: number): Promise<customers> {
    try {
        const oneCustomer = await prisma.customers.findUnique({
            where: {
                id: id,
            },
        })
        if (oneCustomer !== null) {
            await validateClassFields(Customer, <JSON><unknown>oneCustomer)
            return oneCustomer
        }
        logInfo(getOneCustomer.name, `[✓] Customer Record ID:${id} retrieved.`)
        return <customers><unknown>[]
    } catch (err) {
        logInfo(getOneCustomer.name, `[✗] ${err}`)
        throw err;
    }
}

export async function createCustomer(body: JSON) {
    try {
        await validateClassFields(Customer, body)
        const res = await prisma.customers.create({ data: <Prisma.customersCreateInput>body })
        logInfo(createCustomer.name, `[✓] Customer Created: {id: ${res.id}, name: ${res.name}, phone: ${res.phone}, address: ${res.address}, note: ${res.note}}`)
    } catch (err) {
        logError(createCustomer.name, err, `[✗]`);
        throw err;
    }
}

export async function deleteOneCustomer(id: number): Promise<void> {
    try {
        const res = await prisma.customers.delete({
            where: { id: id },
        })
        logInfo(deleteOneCustomer.name, `[✓] Customer Deleted: {id: ${res.id}, name: ${res.name}, phone: ${res.phone}, address: ${res.address}, note: ${res.note}}`)
    } catch (err) {
        logError(deleteOneCustomer.name, err, `[✗]`);
        throw err;
    }
}

export async function updateCustomer(id: number, customer: Prisma.customersUpdateInput): Promise<void> {
    try {
        const res = await prisma.customers.update({
            where: { id: id },
            data: {
                name: customer.name,
                phone: customer.phone,
                address: customer.address,
                note: customer.note,
            },
        })
        logInfo(updateCustomer.name, `[✓] Customer Updated: {id: ${res.id}, name: ${res.name}, phone: ${res.phone}, address: ${res.address}, note: ${res.note}}`)
    } catch (err) {
        logError(updateCustomer.name, err, `[✗]`);
        throw err;
    }
}
