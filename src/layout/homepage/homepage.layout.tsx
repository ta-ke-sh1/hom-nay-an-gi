import {
    Container, Grid, Group,
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

gsap.registerPlugin(Flip);

export default function HomepageLayout() {

    // Data
    const [dishes, setDishes] = useState<Dish[]>([]);

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
            const selectedContainer = Helpers.getElementById(CONTAINER_IDS.selected_container)
            const children = selectedContainer.children

            const deckContainer = Helpers.getElementById(CONTAINER_IDS.deck_container)

            for (let i = 0; i < children.length; i++) {
                const state = Flip.getState(children[i])
                deckContainer.children[0].appendChild(children[i])
                Flip.from(state, {
                    position: 'relative',
                    duration: 0.6,
                    ease: "power1.inOut",
                    absolute: true,
                    rotate: 0
                })
            }

        } catch (e: any) {
            notifications.show({
                title: "Handle Reset",
                message: e.toString(),
            });
        }
    }

    async function handlePick() {
        handleReset()
        // const randomIndex = UtilsService.getRandomIndex(0, dishes.length)
        // const dish = dishes[randomIndex]

        const temp = JSON.parse(JSON.stringify(dishes))
        const shuffled = UtilsService.shuffleArray(temp)
        const selectedContainer = Helpers.getElementById(CONTAINER_IDS.selected_container)

        for(let i = 0; i < shuffled.length; i++) {
            const item = document.getElementById(Helpers.getCardElementId(shuffled[i].name))
            const state = Flip.getState(item)
            selectedContainer.appendChild(item)
            Flip.from(state, {
                position: 'absolute',
                left: 0,
                top: 0,
                duration: 0.6,
                ease: "power1.inOut",
                absolute: true,
                rotate: 0
            })
        }
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
                                }} className={CARD_CLASS_NAME} id={cardId} key={`${cardId}-${index}`}>
                                    <DishCard index={index + 1} dish={dish}/>
                                </Grid.Col>
                            )
                        })
                    }
                </Grid>
                <Group justify={'center'} id={CONTAINER_IDS.selected_container} style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    minWidth: '1000px',
                    transform: 'translate(-50%, -50%)'
                }}>
                </Group>
                <ControlBar
                    handleAddDish={handleAddDish}
                    handlePick={handlePick}
                />
            </Container>
        </>

    )
}