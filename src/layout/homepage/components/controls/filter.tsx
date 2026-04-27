import {Accordion, ActionIcon, Group, Select, Stack, Text, TextInput} from "@mantine/core";
import {useEffect, useState} from "react";
import {CacheStorage} from "../../../../enums/storage.ts";
import {RequestService} from "../../../../services/request.service.ts";
import {BASE_PADDING_SIZE} from "../../../../styling/size.ts";
import {IconSearch, IconX} from "@tabler/icons-react";
import {BG_COLORS, THEME_COLORS} from "../../../../styling/colors.ts";
import {useForm} from "@mantine/form";
import {ZIndexLevels} from "../../../../styling/zIndex.ts";

interface FilterControlProps {
    handleSearch: any,
}

const accordionStyle = {
    color: 'white',
    backgroundColor: BG_COLORS.DEFAULT,
    backdropFilter: 'blur(10px)',
}

interface FilterFormValues {
    name: string;
    tag: string | null;
}


export default function FilterControls({handleSearch}: FilterControlProps) {

    const filterForm = useForm<FilterFormValues>({
        initialValues: {
            name: "",
            tag: ""
        }
    })

    const [tags, setTags] = useState<any[]>([])

    useEffect(() => {
        (async () => await getTags())();
    }, []);

    async function getTags(force: boolean = false) {
        const service = new RequestService();
        await service.getDataHandler(CacheStorage.tags, setTags, service.getAllTags, force)
    }

    async function handleClear() {
        filterForm.reset()
    }

    function handleSearchEvent() {
        const {name, tag} = filterForm.values
        handleSearch(name, tag)
    }

    return (
        <div style={{
            position: 'fixed',
            top: BASE_PADDING_SIZE,
            right: BASE_PADDING_SIZE,
            zIndex: ZIndexLevels.MEDIUM,
        }}>
            <Accordion
                transitionDuration={500}
                styles={{
                    item: accordionStyle,
                    control: accordionStyle,
                    panel: accordionStyle,
                }}
                variant={'filled'}
                style={{
                    width: '20dvw',
                    minWidth: '200px',
                    maxWidth: '400px',

                }}>
                <Accordion.Item value={'filter'}>
                    <Accordion.Control onClick={handleClear}>
                        <Text>NARROW IT DOWN?</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Stack gap={30}>
                            <TextInput styles={{
                                input: {color: 'white'},
                            }} key={filterForm.key("name")} {...filterForm.getInputProps("name")}
                                       placeholder={'by name?'} style={{
                                color: 'white',
                                borderBottom: `1px solid white`,
                            }} variant={'unstyled'}/>
                            <Select styles={{
                                input: {color: 'white'},
                            }} rightSection={null} key={filterForm.key("tag")} {...filterForm.getInputProps("tag")}
                                    data={tags.map((t) => t.name)} placeholder={'by tag?'} style={{
                                color: 'white',
                                borderBottom: `1px solid white`,
                            }} variant={'unstyled'}/>
                            <Group justify={'space-between'}>
                                <ActionIcon onClick={handleSearchEvent} variant={'transparent'} color={'white'}>
                                    <IconSearch/>
                                </ActionIcon>
                                <ActionIcon onClick={handleClear} variant={'transparent'} color={'white'}>
                                    <IconX/>
                                </ActionIcon>
                            </Group>
                        </Stack>
                    </Accordion.Panel>

                </Accordion.Item>
            </Accordion>
        </div>
    )
}