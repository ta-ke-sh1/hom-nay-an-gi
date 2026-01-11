import type {Dish} from "../../model/dish/dish.ts";
import {Card, Group, Stack, Text, Title} from "@mantine/core";
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
            <Card.Section pl={'lg'} pt={"md"} pr={"lg"} style={{
                height: '105%'
            }}>
                <Stack style={{
                    height: '100%',
                }} justify={'space-between'}>
                    <Title style={{
                        ...headerStyle,
                        color: textColor
                    }}>
                        {index}.
                    </Title>
                    <Group justify={'end'}>
                        <Stack align={'end'} gap={0}>
                            <Title style={{
                                ...headerStyle,
                                color: textColor
                            }}>
                                {dish.name}
                            </Title>
                            <Text style={{
                                color: textColor
                            }}>
                                { dish.locations.length } location{dish.locations.length > 1 && "s"} saved
                            </Text>
                        </Stack>
                    </Group>
                </Stack>
            </Card.Section>
        </Card>
    )
}