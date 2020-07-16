import { Hero } from '../export.models'

export class GetHeroes {
    static readonly type = '[API] Get Heroes';
}

export class GetHeroesPage {
    static readonly type = '[API] Get Specific Page';
    constructor(public pageNumber: number = 1, public pageSize: number = 50) {}
}


export class GetHeroById {
    static readonly type = '[API] Get Hero By Id';

    constructor(public heroId: number) {}
}

export class CreateHero {
    static readonly type = '[API] Create Hero';
    constructor(public hero: Hero) {}
}

export class EditHero {
    static readonly type = '[API] Edit Hero';
    constructor(public hero: Hero) {}
}

export class DeleteHero {
    static readonly type = '[API] Delete Hero';
    constructor(public heroId: number) {}
}
