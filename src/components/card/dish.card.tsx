import type {Dish} from "../../model/dish/dish.ts";
import {Card, Title} from "@mantine/core";
import {headerStyle} from "../../styling/typo.ts";

export interface DishCardProps {
    dish: Dish,
    index: number,
    bgColor?: string,
    textColor?: string,
}

export default function DishCard({ dish, index, bgColor = 'white', textColor = 'black' }: DishCardProps) {
    return (
        <Card shadow={'xs'} bdrs={'lg'} style={{
            height: '400px',
            backgroundColor: bgColor
        }}>
            <Card.Section p={'md'}>
                <Title style={{
                    ...headerStyle,
                    position: 'absolute',
                    top: 10,
                    left: 20,
                    color: textColor
                }}>
                    {index}.
                </Title>
                <Title style={{
                    ...headerStyle,
                    position: 'absolute',
                    bottom: 15,
                    right: 20,
                    color: textColor
                }}>
                    {dish.name}
                </Title>
            </Card.Section>
        </Card>
    )
}