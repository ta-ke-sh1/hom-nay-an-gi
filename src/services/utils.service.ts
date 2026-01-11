import dayjs from "dayjs";
import {ColorDecks, DeckNames} from "../styling/colors";

export class UtilsService {
    public static log_timestamp(message: string) {
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const msg = `[${timestamp}] ${message}`
        console.log(msg);
        return msg;
    }
    
    public static getColor(deck: DeckNames, index: any) {
        // Get color by index vs deck length modulo
        const modulo = ColorDecks[deck].length % index;
        console.log(modulo)
        console.log(ColorDecks[deck])
        return ColorDecks[deck][modulo]
    }
}