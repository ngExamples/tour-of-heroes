/**
 * represent hero information
 */
export class Hero {

    /**
     * initialize new instance
     * @param id hero identifier
     * @param gender hero gender
     * @param heroName hero fame name
     * @param realName hero real name
     * @param imgaeUrl hero image url
     * @param powers hero power measures
     */
    constructor(
        public id: number,
        public gender: string,
        public heroName: string,
        public realName: string,
        public imgaeUrl: string,
        public powers: {
            intelligence: number,
            strength: number,
            speed: number,
            durability: number,
            power: number,
            combat: number
        }
    )
    { }

    /**
     * make a copy of hero
     * @param hero hero to copy
     * @returns a copy of input hero
     */
    public static clone(hero: Hero) : Hero {
        if (hero == null)
            return null;

        return new Hero(hero.id, hero.gender, hero.heroName, hero.realName, hero.imgaeUrl, {...hero.powers });
    }

    /**
     * create empty hero instance
     * @returns empty hero instance
     */
    public static new() : Hero {
        return new Hero(-1, '', '', '', '', {
            intelligence: 0,
            strength: 0,
            speed: 0,
            durability: 0,
            power: 0,
            combat: 0
        });
    }

}
