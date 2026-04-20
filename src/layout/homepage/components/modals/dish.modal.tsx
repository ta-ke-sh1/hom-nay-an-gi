import { useForm } from "@mantine/form";
import {
    TextInput,
    Button,
    Group,
    Stack, MultiSelect,
} from "@mantine/core";
import type {Dish} from "../../../../model/dish/dish.ts";
import {useEffect, useState} from "react";
import {CacheStorage} from "../../../../enums/storage.ts";
import {RequestService} from "../../../../services/request.service.ts";
import {notifications} from "@mantine/notifications";

interface DishModalProps {
    dish?: Dish
    close: any,
    refresh: any
}

export default function DishModal({ dish, close, refresh } : DishModalProps ) {

    const form = useForm<any>({
        initialValues: {
            name: dish ? dish.name : "",
            tags: dish ? dish.tags : [],
        },
    });

    const [tags, setTags] = useState<any[]>([])

    useEffect(() => {
        (async () => await getTags())();
    }, []);

    async function getTags(): Promise<void>{

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
        if(!cache) {
            setTags([])
        } else {
            tagToSelectOption(JSON.parse(cache))
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const service = new RequestService()

        const response = await service.addDish({
            name: form.values.name,
            tags: form.values.tags,
            images: []
        })

        if(response.status){
            notifications.show({
                color: 'blue',
                title: 'Request result',
                message: "Dish added!"
            })
            close()
            refresh()
        } else {
            notifications.show({
                color: 'red',
                title: 'Request result',
                message: e.toString()
            })
        }
    };

    return (
        <form>
            <Stack>
                <TextInput
                    label="Dish Name"
                    placeholder="Enter dish name"
                    {...form.getInputProps("name")}
                />

                <MultiSelect
                    searchable
                    label="Tags"
                    placeholder="Select tags"
                    data={tags}
                    {...form.getInputProps("tags")}
                />

                <Group>
                    <Button onClick={handleSubmit}>Add Dish</Button>
                </Group>
            </Stack>
        </form>
    );
}
