export enum DeckNames {
    SunnyBeachDay = "Sunny Beach Day",
    PeachSorbet = "Peach Sorbet",
    CherryBlossomBloom = "Cherry Blossom Bloom",
}

export type Color = {
    bg: string,
    text: string,
}

export const ColorDecks: Record<DeckNames, Color[]> = {
    [DeckNames.SunnyBeachDay]: [
        {
            bg: "#264653",
            text: "white"
        },
        {
            bg: "#2a9d8f",
            text: "white"
        },
        {
            bg: "#e9c46a",
            text: "white"
        },
        {
            bg: "#f4a261",
            text: "white"
        },
        {
            bg: "#e76f51",
            text: "white"
        },
        {
            bg: "#ca6702",
            text: "white"
        },
        {
            bg: "#ae2012",
            text: "white"
        },
    ],
    [DeckNames.PeachSorbet]: [
        {
            bg: "#f08080",
            text: "white",
        },
        {
            bg: "#f8ad9d",
            text: "black",
        },
        {
            bg: "#fbc4ab",
            text: "black",
        },
        {
            bg: "#ffdab9",
            text: "black",
        },
    ],
    [DeckNames.CherryBlossomBloom]: [
        {
            bg: "#a4133c",
            text: "white",
        },
        {
            bg: "#590d22",
            text: "white",
        },
        {
            bg: "#a4133c",
            text: "white",
        },
        {
            bg: "#ff4d6d",
            text: "white",
        },
        {
            bg: "#ff758f",
            text: "white"
        },
        {
            bg: "#ffb3c1",
            text: "black",
        },
        {
            bg: "#ffccd5",
            text: "black"
        }
    ]
}

export const THEME_COLORS = {
    PRIMARY: "#f3722c",
    BACKGROUND: "rgb(234,216,203)",
}

export const BORDERS = {
    DEFAULT: "1px solid rgba(0,0,0,0.1)"
}

export const BG_COLORS = {
    DEFAULT: "rgba(0,0,0,0.05)"
}

export const TEXT_COLORS = {
    title: "#424242",
    paragraph: "#696969",
}