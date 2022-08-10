import { IsNotEmpty, IsString, IsOptional } from "class-validator";
import { validateClassFields } from "../utils";
import { prisma } from '../../app'
import { logInfo, logError } from '../../logging/utils'
import { customers } from "@prisma/client";
import { Prisma } from '@prisma/client';

export class Customer {
    id?: number;

    name?: string | Prisma.NullableStringFieldUpdateOperationsInput | null | undefined;

    @IsNotEmpty()
    phone!: string | Prisma.NullableStringFieldUpdateOperationsInput | null | undefined

    
    @IsOptional()
    buzzer_number?: string | Prisma.NullableStringFieldUpdateOperationsInput | null | undefined
    
    @IsOptional()
    unit_number?: string | Prisma.NullableStringFieldUpdateOperationsInput | null | undefined
    
    @IsOptional()
    street_number?: number | Prisma.NullableIntFieldUpdateOperationsInput | null | undefined
    
    @IsOptional()
    street_name?: string | Prisma.NullableStringFieldUpdateOperationsInput | null | undefined
    
    @IsOptional()
    address?: string | null;
    
    @IsOptional()
    note?: string | Prisma.NullableStringFieldUpdateOperationsInput | null | undefined

    @IsOptional()
    city?: string | null;
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

function buildCustomerAddress(body: Customer): string | null {
    if (body.street_number && body.street_name) {
        const unitNumber = body.unit_number ? `${body.unit_number} - ` : '';
        return `${unitNumber}${body.street_number} ${body.street_name}`
    }
    return null
}

export async function createCustomer(body: JSON): Promise<customers> {
    try {
        await validateClassFields(Customer, body)
        const customer = {
            ...body,
            address: buildCustomerAddress(body as unknown as Customer)
        }

        const res = await prisma.customers.create({ data: <Prisma.customersCreateInput>customer })
        logInfo(createCustomer.name, `[✓] Customer Created: {id: ${res.id}, name: ${res.name}, phone: ${res.phone}, address: ${res.address}, note: ${res.note}}`)
        return res
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

export async function updateCustomer(id: number, customer: Prisma.customersUpdateInput): Promise<Customer> {
    try {
        const streetNumber = isNaN(parseInt(customer.street_number as string)) ? null : parseInt(customer.street_number as string)
        const customerDetails: Customer = {
            name: customer.name === "" ? null : customer.name,
            phone: customer.phone,
            buzzer_number: customer.buzzer_number === "" ? null : customer.buzzer_number,
            unit_number: customer.unit_number === "" ? null : customer.unit_number,
            street_number: streetNumber,
            street_name: customer.street_name === "" ? null : customer.street_name,
            address: buildCustomerAddress(customer as unknown as Customer),
            note: customer.note === "" ? null : customer.note,
        };
        const res = await prisma.customers.update({
            where: { id: id },
            data: customerDetails,
        })
        logInfo(updateCustomer.name, `[✓] Customer Updated: {id: ${res.id}, name: ${res.name}, phone: ${res.phone}, address: ${res.address}, note: ${res.note}}`)
        return customerDetails;
    } catch (err) {
        logError(updateCustomer.name, err, `[✗]`);
        throw err;
    }
}
