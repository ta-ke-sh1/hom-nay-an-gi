import {Button, Container, Divider, Grid, Group, Select, Stack, Text, TextInput} from "@mantine/core";
import {useEffect, useState} from "react";
import type {Dish} from "../../model/dish/dish.ts";
import {DishService} from "../../services/dish.service.ts";
import {UtilsService} from "../../services/utils.service.ts";
import DishCard from "../../components/card/dish.card.tsx";
import {NavbarHeight} from "../../styling/size.ts";
import {DeckNames} from "../../styling/colors.ts";
import {IconArrowsShuffle, IconDice, IconFilter, IconPlus, IconRefresh, IconSearch} from "@tabler/icons-react";

export default function Homepage(){

    // Data
    const [dishes, setDishes] = useState<Dish[]>([]);

    // Form
    const [theme, setTheme] = useState<DeckNames>(DeckNames.CherryBlossomBloom)
    const [searchKeyword, setSearchKeyword] = useState<string>("")
    const [tagFilter, setTagFilter] = useState<string>("")

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

    function handleSearch(){

    }

    function handleFilter(){

    }

    function handleShuffle(){

    }

    function handlePick(){

    }

    function handleAdd(){

    }

    function handleRefresh(){

    }

    return (
        <Container fluid p={'xl'} style={{
            marginTop: `${NavbarHeight}px`
        }}>
            <Stack>
                <Group gap={'lg'} justify={'space-between'}>
                    <Group>
                        <Stack gap={5}>
                            <Text>Search</Text>
                            <Group>
                                <TextInput value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                                <Button onClick={handleSearch} leftSection={<IconSearch />}>SEARCH</Button>
                            </Group>
                        </Stack>
                        <Divider orientation={'vertical'} />
                        <Stack gap={5}>
                            <Text>Filter</Text>
                            <Group>
                                <Select value={tagFilter} onChange={(e) => {
                                    if(e){
                                        setTagFilter(e)
                                    }
                                }} />
                                <Button onClick={handleFilter} leftSection={<IconFilter />}>FILTER</Button>
                            </Group>
                        </Stack>
                    </Group>
                    <Group>
                        <Stack gap={5}>
                            <Text>Theme</Text>
                            <Select value={theme} onChange={(e) => setTheme(e as DeckNames)} />
                        </Stack>
                        <Divider orientation={'vertical'} />
                        <Stack gap={5}>
                            <Text>Controls</Text>
                            <Group>
                                <Button onClick={handleShuffle} leftSection={<IconArrowsShuffle />}>SHUFFLE</Button>
                                <Button onClick={handlePick} leftSection={<IconDice />}>PICK 1</Button>
                                <Button onClick={handleAdd} leftSection={<IconPlus />}>ADD</Button>
                                <Button onClick={handleRefresh} leftSection={<IconRefresh />}>REFRESH</Button>
                            </Group>
                        </Stack>
                    </Group>
                </Group>
                <Divider />
                <Grid>
                    {
                        dishes.length > 0 ? dishes.map((dish: Dish, index: number) => {
                            return (
                                <Grid.Col span={{
                                    base: 12, xs: 6, sm: 4, md: 4, lg: 2
                                }} key={`dish-${index}-${dish.name}`}>
                                    <DishCard dish={dish} />
                                </Grid.Col>
                            )
                        }) : <Text>No dishes available</Text>
                    }
                </Grid>
            </Stack>
        </Container>
    )
}