export default class Animation{
    #section;
    
    constructor() {
        this.#section = $('.animation');
    }

    show() {
        $(this.#section).removeClass('d-none');
    }

    hide() {
        $(this.#section).addClass('d-none');
    }
}