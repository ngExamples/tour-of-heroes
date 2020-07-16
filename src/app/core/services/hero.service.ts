import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable, of } from "rxjs";
import { Hero } from '../export.models'

/**
 * Manage heroes data
 */
@Injectable()
export class HeroService {
    private heroes: Hero[];

    /**
     * initialize new instance
     * @param http the client to execute REST calls
     */
    constructor(private http: HttpClient) {
        const url = `${window.location.origin}/assets/heros.json`;
        http.get<any[]>(url).subscribe(
            data => {
                let list: Hero[] = [];

                for(let i=0; i< data.length; ++i) {
                    list.push(new Hero(data[i].id,
                        data[i].appearance.gender,
                        data[i].name,
                        data[i].biography.fullName,
                        data[i].images.md,
                        {...data[i].powerstats})
                    );
                }

                this.heroes = list;
            }
        );
    }

    /**
     * get all heroes
     * @returns heroes observable
     */
    public getAll() : Observable<Hero[]> {
        return of(this.heroes);
    }

    public getTotalHeroes(): number {
        return this.heroes.length;
    }

    public getPage(pageNumber: number, pageSize: number) {
        let totalPages = Math.floor((this.heroes.length + pageSize - 1) / pageSize);

        let start = (pageNumber * pageSize) - (pageSize - 1);
        let end = Math.min(start + pageSize - 1, this.heroes.length);        

        return of({
            items: this.heroes.slice(start, end + 1),
            totalPages: totalPages,
            currentPage: pageNumber,
            pageSize: pageSize
        });
    }

    /**
     * get hero by id
     * @param id hero identifier
     * @returns hero object, null if hero don't exist
     */
    public getById(id: number): Hero {
        const index = this.heroes.findIndex(e => e.id == id);
        return index != -1? this.heroes[index]: null;
    }

    /**
     * filter database using input predicate
     * @param predicate predicate to filter input hero, return true to include the hero; false to ignore
     * @returns heroes observable which match the predicate
     */
    public filter(predicate: (hero: Hero) => boolean) : Observable<Hero[]> {
        let result: Hero[] = [];

        for(let i=0; i<this.heroes.length; ++i) {
            if (predicate(this.heroes[i])) {
                result.push(this.heroes[i])
            }
        }

        return of(result);
    }

    /**
     * create new hero
     * @param hero hero information
     * @returns hero information with updated id
     */
    public new(hero: Hero): Hero {
        let newHero = { ...hero };
        newHero.id = this.heroes[this.heroes.length - 1].id + 1;
        this.heroes.push(newHero);
        return newHero;
    }

    /**
     * update specified hero
     * @param id hero identifier
     * @param hero hero information
     */
    public update(hero: Hero): void {
        const index = this.heroes.findIndex(e => e.id == hero.id);
        if (index == -1) return;

        let currentHero = this.heroes[index];

        currentHero.gender = hero.gender;
        currentHero.heroName = hero.heroName;
        currentHero.realName = hero.realName;
        currentHero.imgaeUrl = hero.imgaeUrl;
        currentHero.powers = { ...hero.powers };
    }

    /**
     * delete a hero using identifier
     * @param id hero identifier
     */
    public delete(id: number) {
        const index = this.heroes.findIndex(e => e.id == id);
        if (index == -1) return;

        this.heroes = this.heroes.filter(e => e.id != id);
    }
}
