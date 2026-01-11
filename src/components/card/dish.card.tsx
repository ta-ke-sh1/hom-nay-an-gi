import type {Dish} from "../../model/dish/dish.ts";
import {Card, Title} from "@mantine/core";
import {headerStyle} from "../../styling/typo.ts";

export interface DishCardProps {
    dish: Dish,
    bgColor?: string,
    textColor?: string,
}

export default function DishCard({ dish, bgColor = 'white', textColor = 'black' }: DishCardProps) {
    return (
        <Card shadow={'xs'} style={{
            height: '400px',
            backgroundColor: bgColor
        }}>
            <Card.Section p={'md'}>
                <Title style={{
                    ...headerStyle,
                    color: textColor
                }}>
                    {dish.name}
                </Title>
            </Card.Section>
        </Card>
    )
}