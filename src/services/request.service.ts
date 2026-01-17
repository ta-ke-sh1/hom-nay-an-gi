import {DatabaseService} from "./database.service.ts";
import {FirestoreTables} from "../enums/enums.ts";
import type {ResponseData} from "../model/requestDto.ts";
import type {Tag} from "../model/tag/tag.ts";
import BaseService from "./base.service.ts";
import type {Dish} from "../model/dish/dish.ts";

export class RequestService extends BaseService {

    async getAllDishes(): Promise<ResponseData> {
        const dishes = await DatabaseService.getInstance().get(FirestoreTables.DISHES)

        return {
            status: true,
            data: dishes,
        }
    }

    async getAllTags(): Promise<ResponseData> {
        const tags = await DatabaseService.getInstance().get(FirestoreTables.TAGS)

        return {
            status: true,
            data: tags,
        }
    }

    async addDish(dish: Dish): Promise<ResponseData> {
        try {
            await DatabaseService.getInstance().add(FirestoreTables.DISHES, dish)
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
            DatabaseService.getInstance().add(FirestoreTables.TAGS, tag)
        )

        return {
            status: true
        }
    }

}