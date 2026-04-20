import {ActionIcon, Divider, Group, MultiSelect, Stack, Text, TextInput} from "@mantine/core";
import {IconFilter, IconPlus, IconSearch} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {CacheStorage} from "../../../enums/storage.ts";
import {RequestService} from "../../../services/request.service.ts";
import {UtilsService} from "../../../services/utils.service.ts";
import {ZIndexLevels} from "../../../styling/zIndex.ts";

interface FilterControlProps {
    tagFilter: string[],
    setTagFilter: any,
    handleFilter: any,
    handleAddDish: any,
    handleAddTag: any,
    handleSearch: any,
}

export default function FilterControls({ tagFilter, setTagFilter, handleFilter, handleAddDish, handleAddTag, handleSearch }: FilterControlProps) {

    const [tags, setTags] = useState<any[]>([])

    const [searchKeyword, setSearchKeyword] = useState<string>("")

    useEffect(() => {
        (async () => await getTags())();
    }, []);

    async function getTags(force = false): Promise<void>{

        function tagToSelectOption(data: any[]){
            const labels: any[] = []
            for(let i = 0; i < data.length; i++){
                labels.push({
                    label: data[i].name,
                    value: data[i].name
                })
            }
            setTags(labels)
        }

        const cache = sessionStorage.getItem(CacheStorage.tags)
        if(!cache || force) {
            const dishService = new RequestService();
            const tagsData = await dishService.getAllTags()

            if (tagsData.status) {
                tagToSelectOption(tagsData.data!)
                sessionStorage.setItem(CacheStorage.tags, JSON.stringify(tagsData.data))
            } else {
                UtilsService.log_timestamp(tagsData.message!)
            }
        } else {
            tagToSelectOption(JSON.parse(cache))
        }
    }

    return (
        <Stack style={{
            zIndex: ZIndexLevels.MEDIUM
        }}>
            <Stack gap={5}>
                <Text>Tags</Text>
                <Group>
                    <MultiSelect style={{
                        width: '100%'
                    }} data={tags} multiple={true} value={tagFilter} onChange={(e) => {
                        if (e) {
                            setTagFilter(e)
                        }
                    }}/>
                    <ActionIcon onClick={handleFilter} size={'lg'}><IconFilter/></ActionIcon>
                    <ActionIcon onClick={handleAddTag} size={'lg'}><IconPlus/></ActionIcon>
                </Group>
            </Stack>

            <Divider />
            <Stack gap={5}>
                <Text>Dishes</Text>
                <Group>
                    <Group>
                        <TextInput value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}/>
                        <ActionIcon onClick={handleSearch} size={'lg'}><IconSearch/></ActionIcon>
                    </Group>

                    <ActionIcon onClick={handleAddDish} size={'lg'}><IconPlus/></ActionIcon>

                </Group>
            </Stack>
        </Stack>
    )
}