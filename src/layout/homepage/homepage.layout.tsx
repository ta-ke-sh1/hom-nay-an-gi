import {
    ActionIcon,
    Button,
    Container,
    Divider,
    Grid,
    Group,
    Modal,
    Select,
    Stack,
    Text,
    TextInput
} from "@mantine/core";
import {useEffect, useState} from "react";
import type {Dish} from "../../model/dish/dish.ts";
import {DishService} from "../../services/dish.service.ts";
import {UtilsService} from "../../services/utils.service.ts";
import DishCard from "../../components/card/dish.card.tsx";
import {NavbarHeight} from "../../styling/size.ts";
import {DeckNames} from "../../styling/colors.ts";
import {IconArrowsShuffle, IconDice, IconFilter, IconPlus, IconRefresh, IconSearch} from "@tabler/icons-react";
import {CacheStorage} from "../../enums/storage.ts";
import DishModal from "./components/modals/dish.modal.tsx";

export default function HomepageLayout() {

    // Data
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [tags, setTags] = useState<any[]>([])

    // Actions
    const [theme, setTheme] = useState<DeckNames>(DeckNames.CherryBlossomBloom)
    const [searchKeyword, setSearchKeyword] = useState<string>("")
    const [tagFilter, setTagFilter] = useState<string>("")

    // Form state
    const [openDish, setOpenDish] = useState<boolean>(false);

    useEffect(() => {
        (async () => await getDishes())();
        (async () => await getTags())();
    }, []);

    async function getTags(force = false): Promise<void>{

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
        if(!cache || force) {
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

    async function handleAddDish() {
        setOpenDish(true)
    }

    async function handleRefresh() {
        await getTags(true)
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
                            <Text>Tags</Text>
                            <Group>
                                <Select data={tags} multiple={true} value={tagFilter} onChange={(e) => {
                                    if (e) {
                                        setTagFilter(e)
                                    }
                                }}/>
                                <ActionIcon onClick={handleFilter} size={'lg'}><IconFilter/></ActionIcon>
                                <ActionIcon onClick={handleAddDish} size={'lg'}><IconPlus/></ActionIcon>
                            </Group>
                        </Stack>
                        <Divider orientation={'vertical'}/>
                        <Stack gap={5}>
                            <Text>Dishes</Text>
                            <Group>
                                <Group>
                                    <TextInput value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}/>
                                    <ActionIcon onClick={handleSearch} size={'lg'}><IconSearch/></ActionIcon>
                                </Group>
                                <ActionIcon onClick={handleShuffle} size={'lg'}><IconArrowsShuffle/></ActionIcon>
                                <ActionIcon onClick={handlePick} size={'lg'}><IconDice/></ActionIcon>
                                <ActionIcon onClick={handleAddDish} size={'lg'}><IconPlus/></ActionIcon>
                                <ActionIcon onClick={handleRefresh} size={'lg'}><IconRefresh/></ActionIcon>
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
                            } value={theme} onChange={(e) => {
                                if(e) {
                                    setTheme(e as DeckNames)
                                }
                            }}/>
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

            <Modal title={"Add Dish"} centered={true} opened={openDish} onClose={() => setOpenDish(false)}>
                <DishModal />
            </Modal>
        </Container>
    )
}