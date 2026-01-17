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
import {NavbarHeight} from "../../styling/size.ts";
import {DeckNames} from "../../styling/colors.ts";
import DishModal from "./components/modals/dish.modal.tsx";
import {ZIndexLevels} from "../../styling/zIndex.ts";
import ControlBar from "./controls/control.tsx";
import DisplayControls from "./controls/display.tsx";
import FilterControls from "./controls/filter.tsx";
import gsap from "gsap";
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

    // Control display
    useEffect(() => {
        if(displayRef.current){
            gsap.set(displayRef.current, {
                bottom: '-100%'
            })
        }

        if(filterRef.current) {
            gsap.set(filterRef.current, {
                bottom: '-100%'
            })
        }
    }, []);

    async function getDishes(): Promise<void> {
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

    }

    async function handlePick() {

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
        if(!displayRef.current){
            return
        }

        gsap.to(displayRef.current, {
            bottom: openDisplayMenu ? "-100%" : NavbarHeight,
        })

        setOpenDisplayMenu(!openDisplayMenu)
    }

    function toggleFilterControl() {
        if(!filterRef.current){
            return
        }

        gsap.to(filterRef.current, {
            bottom: openFilterMenu ? "-100%" : NavbarHeight,
        })

        setOpenFilterMenu(!openFilterMenu)
    }

    return (
        <Container fluid p={'xl'}>

            <Stack ref={filterRef} p={'xl'} style={{
                position: 'fixed',
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: NavbarHeight,
                width: '600px',
                zIndex: ZIndexLevels.HIGH,
                backgroundColor: 'white',
                border: '1px solid rgba(0,0,0,0.2)'
            }}>
                <FilterControls
                    tagFilter={tagFilter}
                    setTagFilter={setTagFilter}
                    handleFilter={handleFilter}
                    handleAddDish={handleAddDish}
                    handleAddTag={handleAddTag}
                    handleSearch={handleSearch} />
            </Stack>

            <Stack ref={displayRef} p={'xl'} style={{
                position: 'fixed',
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: NavbarHeight,
                width: '600px',
                zIndex: ZIndexLevels.HIGH,
                backgroundColor: 'white',
                border: '1px solid rgba(0,0,0,0.2)'
            }}>
                <DisplayControls theme={theme} setTheme={setTheme} />
            </Stack>

            <Stack>
                <Grid>
                    {
                        dishes.length > 0 && dishes.map((dish: Dish, index: number) => {
                            const color = UtilsService.getColor(theme, index + 1)
                            return (
                                <Grid.Col span={{
                                    base: 12, xs: 6, sm: 4, md: 4, lg: 3, xl: 2
                                }} key={`dish-${index}-${dish.name}`}>
                                    <DishDeck index={index + 1} dish={dish} bgColor={color.bg} textColor={color.text}/>
                                </Grid.Col>
                            )
                        })
                    }
                </Grid>
            </Stack>

            <ControlBar toggleDisplayControl={toggleDisplayControl} toggleFilterControl={toggleFilterControl} handleRefresh={handleRefresh} handlePick={handlePick} handleShuffle={handleShuffle} />

            <Modal title={"Add Dish"} centered={true} opened={openDish} onClose={() => setOpenDish(false)}>
                <DishModal refresh={handleRefresh} close={() => setOpenDish(false)} />
            </Modal>

            <Modal title={"Add Tag"} centered={true} opened={openTag} onClose={() => setOpenTag(false)}>
                <TagModal refresh={handleRefresh} close={() => setOpenTag(false)} />
            </Modal>
        </Container>
    )
}