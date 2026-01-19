import {
    Container,
    Grid,
    Modal,
    Stack,
} from "@mantine/core";
import {useEffect, useRef, useState} from "react";
import type {Dish} from "../../model/dish/dish.ts";
import {RequestService} from "../../services/request.service.ts";
import {UtilsService} from "../../services/utils.service.ts";
import DishDeck from "../../components/card/dishDeck.tsx";
import {DeckNames} from "../../styling/colors.ts";
import DishModal from "./components/modals/dish.modal.tsx";
import ControlBar from "./controls/control.tsx";
import DisplayControls from "./controls/display.tsx";
import FilterControls from "./controls/filter.tsx";
import {CacheStorage} from "../../enums/storage.ts";
import TagModal from "./components/modals/tag.modal.tsx";

export default function HomepageLayout() {

    const displayRef = useRef<any>(null);
    const filterRef = useRef<any>(null);

    // Data
    const [dishes, setDishes] = useState<Dish[]>([]);


    // Actions
    const [theme, setTheme] = useState<DeckNames>(DeckNames.CherryBlossomBloom)

    const [tagFilter, setTagFilter] = useState<string[]>([])

    // Form state
    const [openDish, setOpenDish] = useState<boolean>(false);
    const [openTag, setOpenTag] = useState<boolean>(false);
    const [openFilterMenu, setOpenFilterMenu] = useState<boolean>(false);
    const [openDisplayMenu, setOpenDisplayMenu] = useState<boolean>(false);

    // Fetch dishes
    useEffect(() => {
        (async () => await getDishes())();
    }, []);


    async function getDishes(force: boolean = false): Promise<void> {

        const cached = localStorage.getItem(CacheStorage.dishes);
        if(cached && !force){
            setDishes(JSON.parse(cached));
            return
        }

        const dishService = new RequestService();
        const dishesData = await dishService.getAllDishes()

        if (dishesData.status) {
            setDishes(dishesData.data!)
            localStorage.setItem(CacheStorage.dishes, JSON.stringify(dishesData.data!))
        } else {
            UtilsService.log_timestamp(dishesData.message!)
        }
    }

    async function handleSearch() {

    }

    async function handleFilter() {

    }

    async function handleShuffle() {
        console.log('shuffle')
        const temp = JSON.parse(JSON.stringify(dishes))
        const shuffled = UtilsService.shuffleArray(temp)
        setDishes(shuffled)
    }

    async function handlePick() {
        const randomIndex = UtilsService.getRandomIndex(0, dishes.length)
        console.log(dishes[randomIndex])
    }

    async function handleAddTag(){
        setOpenTag(true)
    }

    async function handleAddDish() {
        setOpenDish(true)
    }

    async function handleRefresh() {
        await getDishes()
    }

    function toggleDisplayControl() {
        setOpenDisplayMenu(true)
    }

    function toggleFilterControl() {
        setOpenFilterMenu(true)
    }

    return (
        <Container fluid p={'xl'}>
            <Stack>
                <Grid gutter={40}>
                    {
                        dishes.length > 0 && dishes.map((dish: Dish, index: number) => {
                            const color = UtilsService.getColor(theme, index + 1)
                            return (
                                <Grid.Col span={{
                                    base: 12, xs: 6, sm: 4, md: 4, lg: 3, xl: 2
                                }} key={`dish-${index}-${dish.name}`}>
                                    <DishDeck theme={theme} index={index + 1} dish={dish} bgColor={color.bg} textColor={color.text}/>
                                </Grid.Col>
                            )
                        })
                    }
                </Grid>
            </Stack>

            <ControlBar
                toggleDisplayControl={toggleDisplayControl}
                toggleFilterControl={toggleFilterControl}
                handleRefresh={handleRefresh}
                handlePick={handlePick}
                handleShuffle={handleShuffle} />

            <Modal title={"Add Dish"} centered={true} opened={openDish} onClose={() => setOpenDish(false)}>
                <DishModal refresh={handleRefresh} close={() => setOpenDish(false)} />
            </Modal>

            <Modal title={"Add Tag"} centered={true} opened={openTag} onClose={() => setOpenTag(false)}>
                <TagModal refresh={handleRefresh} close={() => setOpenTag(false)} />
            </Modal>

            <Modal title={"Filter"} centered={true} opened={openFilterMenu} onClose={() => setOpenFilterMenu(false)}>
                <FilterControls
                    tagFilter={tagFilter}
                    setTagFilter={setTagFilter}
                    handleFilter={handleFilter}
                    handleAddDish={handleAddDish}
                    handleAddTag={handleAddTag}
                    handleSearch={handleSearch} />
            </Modal>

            <Modal title={"Display"} centered={true} opened={openDisplayMenu} onClose={() => setOpenDisplayMenu(false)}>
                <DisplayControls theme={theme} setTheme={setTheme} />
            </Modal>
        </Container>
    )
}