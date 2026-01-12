import {ActionIcon, Container, Divider, Group} from "@mantine/core";
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
        <Container style={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: ZIndexLevels.HIGHEST
        }}>
            <Group p={'md'} style={{
                border: '1px solid rgba(0, 0, 0, 0.12)',
                borderRadius: '12px',
            }}>
                <ActionIcon onClick={handleRefresh} size={'xl'}><IconRefresh/></ActionIcon>
                <ActionIcon onClick={handlePick} size={'xl'}><IconDice/></ActionIcon>
                <ActionIcon onClick={handleShuffle} size={'xl'}><IconArrowsShuffle/></ActionIcon>
                <Divider orientation={'vertical'} />
                <ActionIcon onClick={toggleFilterControl} size={'xl'}><IconFilter/></ActionIcon>
                <ActionIcon onClick={toggleDisplayControl} size={'xl'}><IconSettings /></ActionIcon>
            </Group>
        </Container>
    )
}