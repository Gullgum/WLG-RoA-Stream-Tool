import { current } from "../../Utils/Globals.mjs";
import { teams } from "../Team/Teams.mjs";

export class PlayerInfo {

    #pronouns = "";
    #side;

    #pronsEl;

    /**
     * Controls the player's pronouns and socials
     * @param {HTMLElement} infoEl - Element with all player info
     * @param {Number} id - Team number
     */
    constructor(infoEl, id) {

        this.#pronsEl = infoEl;

        // L for left side or R for right side
        this.#side = (id % 2 == 0) ? "R" : "L";

    }

    getPronouns() {
        return this.#pronouns;
    }

    /**
     * Updates the displayed player pronouns
     * @param {String} pronouns - The player's pronouns
     */
    async update(pronouns) {

        this.#pronouns = pronouns;

        // delay so we sync timing with everything else
        let delay = current.delay + .6;

        // if not loading up
        if (!current.startup) {

            // but not if we arent loading everything up!
            delay = 0;

            // wait for the top bar animation to proceed
            await teams.hideTopBar(this.#side);

        }

        // update that data
        this.#pronsEl.innerHTML = pronouns;

        // hide the element entirely if no pronouns
        if (pronouns) {
            this.#pronsEl.style.display = "block";
        } else {
            this.#pronsEl.style.display = "none";
            
        }

        // call that top bar to come back up
        teams.showTopBar(delay, this.#side);

    }

}