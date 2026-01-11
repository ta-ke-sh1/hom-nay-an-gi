import {createTheme, MantineProvider} from "@mantine/core";
import {createBrowserRouter, RouterProvider} from "react-router";
import Homepage from "./layout/homepage/homepage.tsx";

import '@mantine/core/styles.css';
import NavigationBar from "./components/navigation/bar.tsx";

import "@fontsource/arimo/700.css";
import "@fontsource/geist-mono/400.css";

export default function App(){

    const router = createBrowserRouter([
        {
            path: "*",
            element: <Homepage />
        }
    ])

    const theme = createTheme({
        fontFamily: "Geist Mono",
    })

    return (
        <MantineProvider theme={theme}>
            <NavigationBar />
            <RouterProvider router={router} />
        </MantineProvider>
    )
}