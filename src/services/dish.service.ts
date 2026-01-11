import {DatabaseService} from "./database.service.ts";
import {FirestoreTables} from "../enums/enums.ts";
import type {ResponseData} from "../model/requestDto.ts";

export class DishService {

    async getAllDishes(): Promise<ResponseData> {
        try {
            const dishes = await DatabaseService.getInstance().get(FirestoreTables.DISHES)
            return {
                status: true,
                data: dishes,
            }
        } catch (e: any) {
            return {
                status: false,
                message: e.toString(),
            }
        }
    }

    async getAllTags(): Promise<ResponseData> {
        try {
            const tags = await DatabaseService.getInstance().get(FirestoreTables.TAGS)
            return {
                status: true,
                data: tags,
            }
        } catch (e: any) {
            return {
                status: false,
                message: e.toString(),
            }
        }
    }


}