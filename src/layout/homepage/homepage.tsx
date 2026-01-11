import {Button, Container, Divider, Grid, Group, Select, Stack, Text, TextInput} from "@mantine/core";
import {useEffect, useState} from "react";
import type {Dish} from "../../model/dish/dish.ts";
import {DishService} from "../../services/dish.service.ts";
import {UtilsService} from "../../services/utils.service.ts";
import DishCard from "../../components/card/dish.card.tsx";
import {NavbarHeight} from "../../styling/size.ts";
import {DeckNames} from "../../styling/colors.ts";
import {IconArrowsShuffle, IconDice, IconFilter, IconPlus, IconRefresh, IconSearch} from "@tabler/icons-react";
import {CacheStorage} from "../../enums/storage.ts";

export default function Homepage() {

    // Data
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [tags, setTags] = useState<any[]>([])

    // Form
    const [theme, setTheme] = useState<DeckNames>(DeckNames.CherryBlossomBloom)
    const [searchKeyword, setSearchKeyword] = useState<string>("")
    const [tagFilter, setTagFilter] = useState<string>("")

    useEffect(() => {
        (async () => await getDishes())();
        (async () => await getTags())();
    }, []);

    async function getTags(): Promise<void>{

        function tagToSelectOption(data: any[]){
            const labels: any[] = []
            for(let i = 0; i < data.length; i++){
                labels.push({
                    label: data[i].name,
                    value: data[i].name
                })
            }
            setTags(labels)
        }

        const cache = localStorage.getItem(CacheStorage.tags)
        if(!cache) {
            const dishService = new DishService();
            const tagsData = await dishService.getAllTags()

            if (tagsData.status) {
                tagToSelectOption(tagsData.data!)
                localStorage.setItem(CacheStorage.tags, JSON.stringify(tagsData.data))
            } else {
                UtilsService.log_timestamp(tagsData.message!)
            }
        } else {
            tagToSelectOption(JSON.parse(cache))
        }
    }

    async function getDishes(): Promise<void> {
        const dishService = new DishService();
        const dishesData = await dishService.getAllDishes()

        if (dishesData.status) {
            setDishes(dishesData.data!)
        } else {
            UtilsService.log_timestamp(dishesData.message!)
        }
    }

    async function handleSearch() {

    }

    async function handleFilter() {

    }

    async function handleShuffle() {

    }

    async function handlePick() {

    }

    async function handleAdd() {

    }

    async function handleRefresh() {
        await getTags()
        await getDishes()
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
                                <TextInput value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}/>
                                <Button onClick={handleSearch} leftSection={<IconSearch/>}>SEARCH</Button>
                            </Group>
                        </Stack>
                        <Divider orientation={'vertical'}/>
                        <Stack gap={5}>
                            <Text>Filter</Text>
                            <Group>
                                <Select data={tags} multiple={true} value={tagFilter} onChange={(e) => {
                                    if (e) {
                                        setTagFilter(e)
                                    }
                                }}/>
                                <Button onClick={handleFilter} leftSection={<IconFilter/>}>FILTER</Button>
                            </Group>
                        </Stack>
                    </Group>
                    <Group>
                        <Stack gap={5}>
                            <Text>Theme</Text>
                            <Select data={
                                Object.values(DeckNames).map((str) => ({
                                    value: str,
                                    label: str
                                }))
                            } value={theme} onChange={(e) => setTheme(e as DeckNames)}/>
                        </Stack>
                        <Divider orientation={'vertical'}/>
                        <Stack gap={5}>
                            <Text>Controls</Text>
                            <Group>
                                <Button onClick={handleShuffle} leftSection={<IconArrowsShuffle/>}>SHUFFLE</Button>
                                <Button onClick={handlePick} leftSection={<IconDice/>}>PICK 1</Button>
                                <Button onClick={handleAdd} leftSection={<IconPlus/>}>ADD</Button>
                                <Button onClick={handleRefresh} leftSection={<IconRefresh/>}>REFRESH</Button>
                            </Group>
                        </Stack>
                    </Group>
                </Group>
                <Divider/>
                <Grid>
                    {
                        dishes.length > 0 && dishes.map((dish: Dish, index: number) => {
                            const color = UtilsService.getColor(theme, index + 1)
                            return (
                                <Grid.Col span={{
                                    base: 12, xs: 6, sm: 4, md: 4, lg: 2
                                }} key={`dish-${index}-${dish.name}`}>
                                    <DishCard index={index + 1} dish={dish} bgColor={color.bg} textColor={color.text}/>
                                </Grid.Col>
                            )
                        })
                    }
                </Grid>
            </Stack>
        </Container>
    )
}