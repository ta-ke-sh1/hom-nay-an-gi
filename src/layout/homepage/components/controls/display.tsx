import {Select, Stack, Text} from "@mantine/core";
import {DeckNames} from "../../../../styling/colors.ts";
import {ZIndexLevels} from "../../../../styling/zIndex.ts";

interface DisplayControlProps {
    theme: DeckNames,
    setTheme: any
}

export default function DisplayControls({ theme, setTheme }: DisplayControlProps) {
    return (
        <Stack style={{
            zIndex: ZIndexLevels.MEDIUM
        }}>
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
    )
}