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
}