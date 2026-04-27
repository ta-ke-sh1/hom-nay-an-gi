import type {Dish} from "../../model/dish/dish.ts";
import {Badge, Card, Group, Stack, Text, Title} from "@mantine/core";
import {headerStyle} from "../../styling/typo.ts";
import {BG_COLORS, BORDERS, TEXT_COLORS, THEME_COLORS} from "../../styling/colors.ts";

export interface DishCardProps {
    dish: Dish,
}

export default function DishCard({dish,}: DishCardProps) {
    return (
        <Card shadow={'sm'} bdrs={'lg'} style={{
            height: '30dvh',
            border: BORDERS.DEFAULT,
            width: '100%',
            backgroundColor: BG_COLORS.DEFAULT,
        }}>
            <Card.Section pl={'lg'} pt={"md"} pr={"lg"} style={{
                height: '105%'
            }}>
                <Stack style={{
                    height: '100%',
                }} justify={'space-between'}>
                    <Group>
                        {
                            dish.tags.map((t, i) => {
                                return <Badge variant={'light'} color={THEME_COLORS.PRIMARY} key={`dish-tag-${t}-${i}`}>{t}</Badge>
                            })
                        }
                    </Group>
                    <Stack align={'start'} gap={4}>
                        <Title style={{
                            ...headerStyle,
                            color: TEXT_COLORS.title,
                        }}>
                            {dish.name}
                        </Title>
                        <Group>
                            <Stack style={{
                                width: '100px',
                                color: TEXT_COLORS.paragraph,
                            }} gap={0}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: 700,

                                }}>SUITABLE FOR</Text>
                                <Text style={{
                                    fontSize: 14,
                                }}>{dish.suitable_for} {dish.suitable_for > 1 ? "people" : "person"}</Text>
                            </Stack>
                            <Stack gap={0} style={{
                                color: TEXT_COLORS.paragraph,
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                }}>Available locations</Text>
                                <Text style={{
                                    fontSize: 14,
                                }}>{dish.locations[0].count}</Text>
                            </Stack>
                        </Group>
                    </Stack>
                </Stack>
            </Card.Section>
        </Card>

    )
}