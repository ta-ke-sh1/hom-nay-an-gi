import {DatabaseService} from "./database.service.ts";
import {FirestoreTables} from "../enums/enums.ts";

export class DishService {

    async getAllDishes(){
        const dishes = await DatabaseService.getInstance().get(FirestoreTables.DISHES)
        return dishes;
    }

}