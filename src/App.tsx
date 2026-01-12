import {createTheme, MantineProvider} from "@mantine/core";
import {createBrowserRouter, RouterProvider} from "react-router";
import HomepageLayout from "./layout/homepage/homepage.layout.tsx";

import '@mantine/core/styles.css';

import "@fontsource/arimo/700.css";
import "@fontsource/geist-mono/400.css";

export default function App(){

    const router = createBrowserRouter([
        {
            path: "*",
            element: <HomepageLayout />
        }
    ])

    const theme = createTheme({
        fontFamily: "Geist Mono",
    })

    return (
        <MantineProvider theme={theme}>
            <RouterProvider router={router} />
        </MantineProvider>
    )
}