
import Helpers from "../helpers.ts";
import {Flip} from "gsap/Flip";

export class AnimationControls {

    private static instance: AnimationControls;

    private constructor() {
    }

    public static getInstance() {
        if (!AnimationControls.instance) {
            AnimationControls.instance = new AnimationControls();
        }
        return AnimationControls.instance;
    }

    async handleShuffle() {

    }

    async handlePick(card_name: string) {
        const item = document.getElementById(Helpers.getCardElementId(card_name))
        const state = Flip.getState(item)

        Flip.from(state, {
            duration: 0.6,
            ease: "power1.inOut",
            absolute: true,
            rotate: 0
        })
    }

}