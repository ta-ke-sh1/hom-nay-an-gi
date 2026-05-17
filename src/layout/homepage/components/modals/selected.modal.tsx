import type {Dish} from "../../../../model/dish/dish.ts";
import {Badge, Group, Stack, Text, Title} from "@mantine/core";
import {TEXT_COLORS, THEME_COLORS} from "../../../../styling/colors.ts";
import {headerStyle} from "../../../../styling/typo.ts";

interface SelectedDishProps {
    dish: Dish | null
}

export default function SelectedDish({ dish }: SelectedDishProps) {

    console.log(dish)
    if(!dish) return null

    return (
        <Stack justify={'center'} align={'center'} style={{
            height: '100%',
        }}>
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
    )
}