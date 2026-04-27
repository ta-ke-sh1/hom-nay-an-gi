import {Group, Divider, Text, ActionIcon, Tooltip} from "@mantine/core";
import { IconDice, IconPlus,} from "@tabler/icons-react";
import {BG_COLORS, BORDERS, THEME_COLORS} from "../../../../styling/colors.ts";

interface ControlBarProps {
    handlePick,
    handleAddDish
}

export default function ControlBar({ handlePick, handleAddDish }: ControlBarProps) {

    function getTimeTitle() {
        const time = new Date().getHours()

        if (time < 9) {
            return "breakfast"
        } else if (time < 11) {
            return "brunch"
        } else if (time < 14) {
            return "lunch"
        } else if (time < 17) {
            return "snack"
        } else if (time < 20) {
            return "dinner"
        } else {
            return "supper"
        }
    }

    return (
        <div style={{
            position: 'fixed',
            left: '50%',
            bottom: '24px',
            transform: 'translateX(-50%)',
            zIndex: 100,
            maxWidth: '60dvw',
        }}>
            <Group className={'control-bar'} pt={5} pb={5} pr={12} pl={20} justify={'center'} style={{
                backgroundColor: BG_COLORS.DEFAULT,
                backdropFilter: 'blur(10px)',
                border: BORDERS.DEFAULT,
                borderRadius: '12px',
            }}>
                <Text style={{
                    color: 'rgba(0,0,0,0.8)',
                    fontSize: 32,
                    fontFamily: 'Instrument Serif'
                }}>looking for {getTimeTitle()}?</Text>
                <Divider color={'rgba(0,0,0,0.8)'} style={{
                    marginTop: 10,
                    marginBottom: 10,
                }} orientation={'vertical'}/>

                <Tooltip transitionProps={{ duration: 400, transition: 'fade-down'}}  label={"Add Dish"} withArrow={true}>
                    <ActionIcon size={'lg'} onClick={handleAddDish} color={'white'}>
                        <IconPlus color={THEME_COLORS.PRIMARY}/>
                    </ActionIcon>
                </Tooltip>
                <Tooltip transitionProps={{ duration: 400, transition: 'fade-down' }} label={"Select a Dish"} withArrow={true}>
                    <ActionIcon size={'lg'} onClick={handlePick} color={'white'}>
                        <IconDice color={THEME_COLORS.PRIMARY}/>
                    </ActionIcon>
                </Tooltip>
            </Group>
        </div>
    )
}