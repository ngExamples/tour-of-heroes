import { Hero } from '../export.models'

export class SelectHero {
    static readonly type = '[UI] Select Hero';

    constructor(public hero: Hero) {}
}
