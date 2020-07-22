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
     * @param imageUrl hero image url
     * @param powers hero power measures
     */
    constructor(
        public id: number,
        public gender: string,
        public heroName: string,
        public realName: string,
        public imageUrl: string,
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

        return new Hero(hero.id, hero.gender, hero.heroName, hero.realName, hero.imageUrl, {...hero.powers });
    }

    /**
     * create empty hero instance
     * @returns empty hero instance
     */
    public static new() : Hero {
        return new Hero(-1, '', '', '', 'https://i.pinimg.com/originals/e6/4c/2b/e64c2b2e68f177e7ac1122fdfb0f8150.jpg', {
            intelligence: 0,
            strength: 0,
            speed: 0,
            durability: 0,
            power: 0,
            combat: 0
        });
    }

}
