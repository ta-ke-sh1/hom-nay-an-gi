import type {DishLocation} from "../location/location.ts";

export interface Dish {
    name: string;
    locations: DishLocation[];
    tags: string[]
    images: string[],
    suitable_for: number,
    description?: string,
}