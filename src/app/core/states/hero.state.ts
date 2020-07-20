import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CreateHero, EditHero, DeleteHero, GetHeroes, GetHeroById, GetHeroesPage } from './hero.actions'
import { SelectHero } from './hero-ui.actions'
import { Hero } from '../export.models';
import { HeroService } from '../export.services';
import { Injectable } from '@angular/core';

/**
 * state information for hero store
 */
export interface HeroStateContext {
    items: Hero[];
    isLoading: boolean;
    isSaving: boolean;
    selectedHero: Hero;

    totalPages: number;
    currentPage: number;
    pageSize: number;
}

/**
 * Hero store
 */
@State<HeroStateContext>({
    name: 'heroStore',
    defaults: {
        items: [],
        isLoading: false,
        isSaving: false,
        selectedHero: Hero.new(),
        totalPages: 1,
        currentPage: 1,
        pageSize: 10
    }
})
@Injectable()
export class HeroState {
    /**
     * initialize new instance
     * @param api the api service
     */
    constructor(private readonly api: HeroService) {}

    @Selector()
    public static getState(state: HeroStateContext) {
        return state;
    }

    @Selector()
    public static isLoading(state: HeroStateContext) {
        return state.isLoading;
    }

    @Selector()
    public static isSaving(state: HeroStateContext) {
        return state.isSaving;
    }

    @Selector()
    public static getSelectedHero(state: HeroStateContext) {
        return state.selectedHero;
    }

    @Selector()
    public static getItems(state: HeroStateContext) {
        return state.items;
    }

    @Selector()
    public static getPage(state: HeroStateContext) {
        return {
            items: state.items,
            totalPages: state.totalPages,
            currentPage: state.currentPage,
            pageSize: state.pageSize
        }
    }

    /**
     * handlers to get all heros
     * @param ctx state context
     */
    @Action(GetHeroes)
    GetHeroes(ctx: StateContext<HeroStateContext>) {

        ctx.patchState({
            isLoading: true
        });

        this.api.getAll().subscribe(data => {
            ctx.patchState({
                items: data,
                isLoading: false,
                selectedHero: Hero.new()
            });
        });
    }

    /**
     * get hero page
     * @param ctx state context
     * @param action action with paging information
     */
    @Action(GetHeroesPage)
    GetHeroesPage(ctx: StateContext<HeroStateContext>, action: GetHeroesPage) {
        ctx.patchState({
            isLoading: true
        });

        this.api.getPage(action.pageNumber, action.pageSize).subscribe(data => {
            ctx.patchState({
                isLoading: false,
                selectedHero: Hero.new(),
                items: data.items,
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                pageSize: data.pageSize
            });
        });
    }

    /**
     * get hero by identifier
     * @param ctx state context
     * @param action action with hero identifier
     */
    @Action(GetHeroById)
    GetHeroById(ctx: StateContext<HeroStateContext>, action: GetHeroById) {
        ctx.patchState({
            isLoading: true
        });

        let hero = this.api.getById(action.heroId);

        ctx.patchState({
            isLoading: false,
            selectedHero: Hero.new()
        });

        if (hero != null)
            ctx.dispatch(new SelectHero(hero))
    }


    /**
     * select specific hero
     * @param ctx state context
     * @param action action with hero information
     */
    @Action(SelectHero)
    SelectHero(ctx: StateContext<HeroStateContext>, action: SelectHero) {
        ctx.patchState({
            selectedHero: action.hero
        });
    }

    /**
     * create new hero
     * @param ctx state context
     * @param action action with hero information
     */
    @Action(CreateHero)
    CreateHero(ctx: StateContext<HeroStateContext>, action: CreateHero) {
        const state = ctx.getState();

        ctx.patchState({
            isSaving: true
        });

        this.api.new(action.hero);

        ctx.patchState({
            isSaving: false
        });

        ctx.dispatch(new GetHeroesPage(state.currentPage, state.pageSize));
    }

    /**
     * update specific hero
     * @param ctx state context
     * @param action action with hero information
     */
    @Action(EditHero)
    EditHero(ctx: StateContext<HeroStateContext>, action: EditHero) {
        const state = ctx.getState();

        ctx.patchState({
            isSaving: true
        });

        this.api.update(action.hero);

        ctx.patchState({
            isSaving: false
        });

        ctx.dispatch(new GetHeroesPage(state.currentPage, state.pageSize));
    }

    /**
     * delete specific hero
     * @param ctx state context
     * @param action action with hero identifier
     */
    @Action(DeleteHero)
    DeleteHero(ctx: StateContext<HeroStateContext>, action: DeleteHero) {
        const state = ctx.getState();

        ctx.patchState({
            isLoading: true
        });

        this.api.delete(action.heroId);

        ctx.patchState({
            isLoading: false
        });

        ctx.dispatch(new GetHeroesPage(state.currentPage, state.pageSize));
    }
}
