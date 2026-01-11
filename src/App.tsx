import {MantineProvider} from "@mantine/core";
import {createBrowserRouter, RouterProvider} from "react-router";
import Homepage from "./layout/homepage/homepage.tsx";

export default function App(){

    const router = createBrowserRouter([
        {
            path: "*",
            element: <Homepage />
        }
    ])

    return (
        <MantineProvider>
            <RouterProvider router={router} />
        </MantineProvider>
    )
}