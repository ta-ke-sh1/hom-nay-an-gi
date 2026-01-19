import dayjs from "dayjs";
import {ColorDecks, DeckNames} from "../styling/colors";

export class UtilsService {
    public static log_timestamp(message: string) {
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        return `[${timestamp}] ${message}`;
    }
    
    public static getColor(deck: DeckNames, index: any) {
        // Get color by index vs deck length modulo
        const modulo = index % ColorDecks[deck].length ;
        return ColorDecks[deck][modulo]
    }

     public static shuffleArray(array: any[]) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element using array destructuring.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    /**
     * Generates a random integer between min (inclusive) and max (exclusive).
     * @param min The minimum value (inclusive).
     * @param max The maximum value (exclusive).
     * @returns A random integer.
     */
    public static getRandomIndex(min: number, max: number): number {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        // The maximum is exclusive and the minimum is inclusive
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }
}