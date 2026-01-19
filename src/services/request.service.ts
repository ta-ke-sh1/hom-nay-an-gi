import {DatabaseService} from "./database.service.ts";
import {DatabaseTables} from "../enums/enums.ts";
import type {ResponseData} from "../model/requestDto.ts";
import type {Tag} from "../model/tag/tag.ts";
import BaseService from "./base.service.ts";

export class RequestService extends BaseService {

    async getAllDishes(): Promise<ResponseData> {
        const dishes = await DatabaseService.getInstance().get(DatabaseTables.DISHES)
        return {
            status: true,
            data: dishes.data ?? [],
        }
    }

    async getAllTags(): Promise<ResponseData> {
        const tags = await DatabaseService.getInstance().get(DatabaseTables.TAGS)

        return {
            status: true,
            data: tags.data ?? [],
        }
    }

    async addDish(dish: any): Promise<ResponseData> {
        try {
            await DatabaseService.getInstance().add(DatabaseTables.DISHES, dish)
            return {
                status: true
            }
        } catch (error: any) {
            console.error(error)
            return {
                status: false,
                message: error.toString()
            }
        }
    }

    async addTag(tag: Tag): Promise<ResponseData> {
        await this.safeRequest(
            DatabaseService.getInstance().add(DatabaseTables.TAGS, tag)
        )

        return {
            status: true
        }
    }

}