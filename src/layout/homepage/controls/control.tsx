import {ActionIcon, Container, Group, Stack, Text} from "@mantine/core";
import {IconArrowsShuffle, IconDice, IconFilter, IconRefresh, IconSettings} from "@tabler/icons-react";
import {ZIndexLevels} from "../../../styling/zIndex.ts";

interface ControlBarProps {
    handleRefresh: any,
    handlePick: any
    handleShuffle: any
    toggleDisplayControl: any
    toggleFilterControl: any
}

export default function ControlBar({ handleRefresh, handlePick, handleShuffle, toggleFilterControl, toggleDisplayControl }: ControlBarProps) {
    return (
        <Container fluid style={{
            position: 'fixed',
            bottom: 20,
            width: '100dvw',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: ZIndexLevels.HIGHEST
        }}>
            <Group justify={'center'}>
                <Stack gap={4} justify={'center'} align={'center'}>
                    <Text style={{
                        fontSize: 14
                    }}>Lọc</Text>
                    <Group p={'md'} style={{
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '12px',
                        backgroundColor: 'white',
                    }}>
                        <ActionIcon onClick={toggleFilterControl} size={'md'}><IconFilter/></ActionIcon>
                    </Group>
                </Stack>

                <Stack gap={4} justify={'center'} align={'center'}>
                    <Text style={{
                        fontSize: 14
                    }}>Hôm Nay Ăn Gì?</Text>
                    <Group p={'md'} style={{
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '12px',
                        backgroundColor: 'white',
                    }}>
                        <ActionIcon onClick={handleRefresh} size={'md'}><IconRefresh/></ActionIcon>
                        <ActionIcon onClick={handlePick} size={'md'}><IconDice/></ActionIcon>
                        <ActionIcon onClick={handleShuffle} size={'md'}><IconArrowsShuffle/></ActionIcon>
                    </Group>
                </Stack>
                <Stack gap={4} justify={'center'} align={'center'}>
                    <Text style={{
                        fontSize: 14
                    }}>Tùy Chọn</Text>
                    <Group p={'md'} style={{
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: '12px',
                        backgroundColor: 'white',
                    }}>
                        <ActionIcon onClick={toggleDisplayControl} size={'md'}><IconSettings /></ActionIcon>
                    </Group>
                </Stack>
            </Group>
        </Container>
    )
}