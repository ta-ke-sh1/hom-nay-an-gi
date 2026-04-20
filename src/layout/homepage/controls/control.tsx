import {ActionIcon, Group, Stack, Text} from "@mantine/core";
import {IconArrowsShuffle, IconDice, IconRefresh} from "@tabler/icons-react";
import {ZIndexLevels} from "../../../styling/zIndex.ts";
import {BUTTON_COLORS} from "../../../styling/colors.ts";

interface ControlBarProps {
    handleRefresh: any,
    handlePick: any
    handleShuffle: any
}

export default function ControlBar({ handleRefresh, handlePick, handleShuffle, }: ControlBarProps) {

    function getTimeTitle() {
        const time = new Date().getHours()

        if(time < 9) {
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
                width: '100dvw',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: ZIndexLevels.HIGHEST
            }}>
                <Group justify={'center'}>
                    <Stack p={'md'} gap={4} justify={'center'} align={'center'}>
                        <Text style={{
                            fontSize: 42,
                            fontFamily: 'Instrument Serif'
                        }}>looking for {getTimeTitle()}?</Text>
                        <Group justify={'center'} style={{
                            width: '100%'
                        }}>
                            <ActionIcon color={BUTTON_COLORS.PRIMARY} variant={'transparent'} onClick={handleRefresh} size={'md'}><IconRefresh/></ActionIcon>
                            <ActionIcon color={BUTTON_COLORS.PRIMARY} variant={'transparent'} onClick={handlePick} size={'md'}><IconDice/></ActionIcon>
                            <ActionIcon color={BUTTON_COLORS.PRIMARY} variant={'transparent'} onClick={handleShuffle} size={'md'}><IconArrowsShuffle/></ActionIcon>
                        </Group>
                    </Stack>
                </Group>
            </div>
    )
}