import type {DishLocation} from "../location/location.ts";
import type {Tag} from "../tag/tag.ts";

export interface Dish {
    name: string;
    locations: DishLocation[];
    tags: Tag[]
    images: string[]
}