import { useForm } from "@mantine/form";
import {
    TextInput,
    Button,
    Group,
    Stack
} from "@mantine/core";
import type {Tag} from "../../../../model/tag/tag.ts";
import {RequestService} from "../../../../services/request.service.ts";
import {notifications} from "@mantine/notifications";

interface TagModalProps {
    tag?: Tag
    close: any,
    refresh: any
}

export default function TagModal({ tag, close, refresh } : TagModalProps ) {

    const form = useForm<any>({
        initialValues: {
            name: tag ? tag.name : "",
        },
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        console.log(form.values)
        const service = new RequestService();
        // send to API or handle state
        const response = await service.addTag({
            name: form.values.name,
        })

        if(response.status){
            notifications.show({
                color: 'blue',
                title: 'Request result',
                message: "Tag added!"
            })
            refresh(true)
            close()
        } else {
            notifications.show({
                color: 'red',
                title: "Request result",
                message: e.message
            })
        }
    };

    return (
        <form>
            <Stack>
                <TextInput
                    label="Tag Name"
                    placeholder="Enter tag name"
                    {...form.getInputProps("name")}
                />
                <Group>
                    <Button onClick={handleSubmit}>Add Tag</Button>
                </Group>
            </Stack>
        </form>
    );
}
