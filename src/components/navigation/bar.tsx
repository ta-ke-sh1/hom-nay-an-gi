import {Container, Title} from "@mantine/core";
import {headerStyle} from "../../styling/typo.ts";

export default function NavigationBar() {
    return (
        <Container pl={'xl'} pt={'lg'} fluid style={{
            position: 'fixed',
            top: 0,
            left: 0
        }}>
            <Title style={{
                ...headerStyle,
            }}>
                Hôm Nay Ăn Gì?
            </Title>
        </Container>
    )
}