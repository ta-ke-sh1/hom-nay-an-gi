import {
    Container, Grid, Modal,
} from "@mantine/core";
import {useEffect, useState} from "react";
import type {Dish} from "../../model/dish/dish.ts";
import {RequestService} from "../../services/request.service.ts";
import {UtilsService} from "../../services/utils.service.ts";
import ControlBar from "./components/controls/control.tsx";
import {CacheStorage} from "../../enums/storage.ts";

import {Flip} from "gsap/Flip";
import gsap from "gsap";
import Helpers from "../../services/helpers.ts";
import {CARD_CLASS_NAME, CONTAINER_IDS} from "../../services/animation/element_id.enums.ts";
import DishCard from "../../components/card/dishCard.tsx";
import {notifications} from "@mantine/notifications";
import SelectedDish from "./components/modals/selected.modal.tsx";

gsap.registerPlugin(Flip);

export default function HomepageLayout() {

    // Data
    const [dishes, setDishes] = useState<Dish[]>([]);

    const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

    // Fetch dishes
    useEffect(() => {
        (async () => await getDishes())();
    }, []);

    async function getDishes(force: boolean = false): Promise<void> {
        const service = new RequestService()
        await service.getDataHandler(CacheStorage.dishes, setDishes, service.getAllDishes, force)
    }

    function handleReset() {
        try {

        } catch (e: any) {
            notifications.show({
                title: "Handle Reset",
                message: e.toString(),
            });
        }
    }

    async function handlePick() {
        handleReset()
        const temp = JSON.parse(JSON.stringify(dishes))
        const shuffled = UtilsService.shuffleArray(temp)
        setSelectedDish(shuffled[0])
    }

    async function handleAddDish() {
        await getDishes()
    }

    return (
        <>
            <Container fluid p={'xl'}>
                <Grid id={CONTAINER_IDS.deck_container} style={{
                    position: 'relative',
                }}>
                    {
                        dishes.length > 0 && dishes.map((dish: Dish, index: number) => {
                            const cardId = Helpers.getCardElementId(dish.name)
                            return (
                                <Grid.Col span={{
                                    base: 12, sm: 6, md: 4, lg: 3
                                }} className={CARD_CLASS_NAME} id={cardId} key={`${cardId}-${index}`} style={{
                                    height: '30dvh'
                                }}>
                                    <DishCard index={index + 1} dish={dish}/>
                                </Grid.Col>
                            )
                        })
                    }
                </Grid>
                <ControlBar
                    handleAddDish={handleAddDish}
                    handlePick={handlePick}
                />
            </Container>
            <Modal fullScreen={true} opened={Boolean(selectedDish)} onClose={() => setSelectedDish(null)}>
                <SelectedDish dish={selectedDish}/>
            </Modal>
        </>

    )
}