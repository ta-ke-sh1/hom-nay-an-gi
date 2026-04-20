import {
    Accordion,
    ActionIcon,
    Container, Grid,
    Group,
    Modal, Select,
    Stack, Text, TextInput,
} from "@mantine/core";
import {useEffect, useState} from "react";
import type {Dish} from "../../model/dish/dish.ts";
import {RequestService} from "../../services/request.service.ts";
import {UtilsService} from "../../services/utils.service.ts";
import {BUTTON_COLORS, DeckNames} from "../../styling/colors.ts";
import DishModal from "./components/modals/dish.modal.tsx";
import ControlBar from "./controls/control.tsx";
import DisplayControls from "./controls/display.tsx";
import {CacheStorage} from "../../enums/storage.ts";
import TagModal from "./components/modals/tag.modal.tsx";
import {BASE_PADDING_SIZE} from "../../styling/size.ts";
import {IconSearch, IconX} from "@tabler/icons-react";
import {useForm} from "@mantine/form";
import DishDeck from "../../components/card/dishDeck.tsx";


interface FilterFormValues {
    name: string;
    tag: string | null;
}

export default function HomepageLayout() {

    const filterForm = useForm<FilterFormValues>({
        initialValues: {
            name: "",
            tag: null
        }
    })

    // Data
    const [dishes, setDishes] = useState<Dish[]>([]);

    // Search data
    const [tags, setTags] = useState<any[]>([]);

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
        (async () => await getTags())();
    }, []);

    async function getDataHandler(table: string, setter: any, getter: any, force: boolean) {
        const cached = sessionStorage.getItem(table);
        if(cached && !force){
            setter(JSON.parse(cached));
            return
        }

        const data = await getter()
        if(data.status) {
            setter(data.data!)
            sessionStorage.setItem(table, JSON.stringify(data.data!))
        } else {
            UtilsService.log_timestamp(data.message!)
        }
    }

    async function getTags(force: boolean = false) {
        const service = new RequestService();
        await getDataHandler(CacheStorage.tags, setTags, service.getAllTags, force)
    }


    async function getDishes(force: boolean = false): Promise<void> {
        const service = new RequestService();
        await getDataHandler(CacheStorage.dishes, setDishes, service.getAllDishes, force)
    }

    async function handleSearch() {
        const {name, tag} = filterForm.getValues()
        console.log(name, tag)
    }

    async function handleClear() {
        filterForm.reset()
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

    async function handleRefresh() {
        await getDishes()
    }

    return (
        <>
            <div style={{
                position: 'fixed',
                top: BASE_PADDING_SIZE,
                right: BASE_PADDING_SIZE,
            }}>
                <Accordion variant={'filled'} style={{
                    width: '20dvw',
                    minWidth: '200px',
                    maxWidth: '400px',
                }}>
                    <Accordion.Item value={'filter'}>
                        <Accordion.Control onClick={handleClear} style={{
                            borderBottom: '1px solid rgba(0,0,0,0.1)',
                        }}>
                            <Text>NARROW IT DOWN</Text>
                        </Accordion.Control>
                        <Accordion.Panel mt={'md'}>
                            <Stack gap={30}>
                                <TextInput key={filterForm.key("name")} {...filterForm.getInputProps("name")} placeholder={'by name?'} style={{
                                    borderBottom: `1px solid ${BUTTON_COLORS.PRIMARY}`,
                                }} variant={'unstyled'} />
                                <Select key={filterForm.key("tag")} {...filterForm.getInputProps("tag")} data={tags.map((t) => t.name)} placeholder={'by tag?'} style={{
                                    borderBottom: `1px solid ${BUTTON_COLORS.PRIMARY}`,
                                }} variant={'unstyled'} />
                                <Group justify={'space-between'}>
                                    <ActionIcon onClick={handleSearch} variant={'transparent'} color={BUTTON_COLORS.PRIMARY}>
                                        <IconSearch />
                                    </ActionIcon>
                                    <ActionIcon onClick={handleClear} variant={'transparent'} color={BUTTON_COLORS.PRIMARY}>
                                        <IconX />
                                    </ActionIcon>
                                </Group>
                            </Stack>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </div>
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
                                        <DishDeck index={index + 1} dish={dish} bgColor={color.bg} textColor={color.text}/>
                                    </Grid.Col>
                                )
                            })
                        }
                    </Grid>
                </Stack>

                <ControlBar
                    handleRefresh={handleRefresh}
                    handlePick={handlePick}
                    handleShuffle={handleShuffle} />

                <Modal title={"Add Dish"} centered={true} opened={openDish} onClose={() => setOpenDish(false)}>
                    <DishModal refresh={handleRefresh} close={() => setOpenDish(false)} />
                </Modal>

                <Modal title={"Add Tag"} centered={true} opened={openTag} onClose={() => setOpenTag(false)}>
                    <TagModal refresh={handleRefresh} close={() => setOpenTag(false)} />
                </Modal>

                <Modal title={"Display"} centered={true} opened={openDisplayMenu} onClose={() => setOpenDisplayMenu(false)}>
                    <DisplayControls theme={theme} setTheme={setTheme} />
                </Modal>
            </Container>
        </>

    )
}