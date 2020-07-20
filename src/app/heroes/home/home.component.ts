import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
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
    isNew: boolean = false;

    @ViewChild('deleteModel') deleteModel: ElementRef;
    @ViewChild('contentModel') contentModel: ElementRef;

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

    onDeleteHero(hero: Hero) {
        this.store.dispatch(new SelectHero(hero));
        $(this.deleteModel.nativeElement).modal('show');
    }

    onCreateHero() {
        this.isNew = true;
        this.store.dispatch(new SelectHero(Hero.new()));
        $(this.contentModel.nativeElement).modal('show');
    }

    onEditHero(hero: Hero) {
        this.isNew = false;
        this.store.dispatch(new SelectHero(hero));
        $(this.contentModel.nativeElement).modal('show');
    }

    onSaveHero() {
        $(this.contentModel.nativeElement).modal('hide');
    }

    deleteSelectedHero() {
        this.store.dispatch(new DeleteHero(this.selectedHero.id));
    }
}
