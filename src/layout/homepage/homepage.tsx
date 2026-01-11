import {Container, Text} from "@mantine/core";
import {Fragment, useEffect, useState} from "react";
import type {Dish} from "../../model/dish/dish.ts";
import {DishService} from "../../services/dish.service.ts";
import {UtilsService} from "../../services/utils.service.ts";
import DishCard from "../../components/card/dish.card.tsx";

export default function Homepage(){

    const [dishes, setDishes] = useState<Dish[]>([]);

    useEffect(() => {
        (async() => await getDishes())();
    }, []);

    async function getDishes(): Promise<void> {
        const dishService = new DishService();
        const dishesData = await dishService.getAllDishes()

        if(dishesData.status){
            setDishes(dishesData.data!)
        } else {
            UtilsService.log_timestamp(dishesData.message!)
        }
    }

    return (
        <Container>
            Hello world
            {
                dishes.length > 0 ? dishes.map((dish: Dish) => {
                    return (
                        <Fragment>
                            <DishCard dish={dish} />
                        </Fragment>
                    )
                }) : <Text>No dishes available</Text>
            }
        </Container>
    )
}