import type {Dish} from "../../model/dish/dish.ts";
import {Card, Title} from "@mantine/core";
import {headerStyle} from "../../styling/typo.ts";

export interface DishCardProps {
    dish: Dish
}

export default function DishCard({ dish }: DishCardProps) {
    return (
        <Card>
            <Card.Section>
                <Title style={{
                    ...headerStyle
                }}>
                    {dish.name}
                </Title>
            </Card.Section>
        </Card>
    )
}