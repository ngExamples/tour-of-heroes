import { Component, OnInit } from '@angular/core'
import { Store } from '@ngxs/store';
import { HeroState } from 'app/core/export.states';
import { Hero } from 'app/core/models/hero';
import { DeleteHero, GetHeroesPage } from 'app/core/states/hero.actions';
import { SelectHero } from 'app/core/states/hero-ui.actions';

@Component({
    selector: "hrs-home",
    templateUrl: "home.component.html"
})
export class HomeComponent implements OnInit {
    page: {items: Hero[], totalPages: number, currentPage: number, pageSize: number};
    selectedHero: Hero;

    constructor(private readonly store: Store) {
        this.store.select(HeroState.getPage).subscribe(e => this.page = e);
        this.store.select(HeroState.getSelectedHero).subscribe(e => this.selectedHero = e);
    }

    ngOnInit() {
        setTimeout (() => {
            this.store.dispatch(new GetHeroesPage(1, 48));
        }, 100);
    }

    nextPage(pageNumber: number) {
        this.store.dispatch(new GetHeroesPage(pageNumber, 48));
    }

    selectHero(hero: Hero) {
        this.store.dispatch(new SelectHero(hero));
    }

    deleteSelectedHero() {
        this.store.dispatch(new DeleteHero(this.selectedHero.id));
    }
}
