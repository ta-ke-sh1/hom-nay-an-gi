import {notifications} from "@mantine/notifications";
import {CARD_PREFIX} from "./animation/element_id.enums.ts";

export default class Helpers {
    static getElementById(id: string): HTMLElement {
        const element = document.getElementById(id);
        if(!element) {
            throw "Failed to get element with id " + id
        }
        return element;
    }

    static getCardElementId(id: string) {
        return `${CARD_PREFIX}-${id}`
    }

}