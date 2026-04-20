import {createTheme, MantineProvider} from "@mantine/core";
import {createBrowserRouter, RouterProvider} from "react-router";
import HomepageLayout from "./layout/homepage/homepage.layout.tsx";

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';


import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/google-sans/400.css";

import {Notifications} from "@mantine/notifications";

export default function App(){

    const router = createBrowserRouter([
        {
            path: "*",
            element: <HomepageLayout />
        }
    ])

    const theme = createTheme({
        fontFamily: "Google Sans",
    })

    return (
        <MantineProvider theme={theme}>
            <Notifications />
            <RouterProvider router={router} />
        </MantineProvider>
    )
}