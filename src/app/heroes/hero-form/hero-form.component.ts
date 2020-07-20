import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Hero } from 'app/core/models/hero';
import { CreateHero, EditHero } from 'app/core/states/hero.actions';
import { HeroState } from 'app/core/export.states';

@Component({
    selector: 'hero-form',
    templateUrl: 'hero-form.component.html'
})
export class HeroFormComponent implements OnInit {
    form: FormGroup

    @Input() isNew: boolean;
    @Output() onSave = new EventEmitter();

    hero: Hero;

    constructor(
        private fb: FormBuilder,
        private store: Store) {
    }

    ngOnInit() {
        this.form = this.fb.group({
            gender: [],
            heroName: [],
            realName: [],
            imgaeUrl: [],
            powers: this.fb.group({
                intelligence: [],
                strength: [],
                speed: [],
                durability: [],
                power: [],
                combat: []
            })
        });

        if (this.isNew)
        {
            this.hero = Hero.new();

            this.form.patchValue({
                gender: '',
                heroName: '',
                realName: '',
                powers : {
                    intelligence: 0,
                    strength: 0,
                    speed: 0,
                    durability: 0,
                    power: 0,
                    combat: 0
                }
            });
        }
        else
        {
            this.store.select(HeroState.getSelectedHero).subscribe(e => {
                this.hero = e;

                this.form.patchValue({
                    gender: e.gender,
                    heroName: e.heroName,
                    realName: e.realName,
                    powers : {
                        intelligence: e.powers.intelligence,
                        strength: e.powers.strength,
                        speed: e.powers.speed,
                        durability: e.powers.durability,
                        power: e.powers.power,
                        combat: e.powers.combat
                    }
                });
            });
        }
    }

    save() {

        //TODO: validate form here

        let hero = Hero.clone(this.hero);

        if (this.form.valid) {
            const data = this.form.value;

            hero.heroName = data.heroName;
            hero.realName = data.realName;
            hero.gender = data.gender;
            hero.powers.combat = data.powers.combat;
            hero.powers.durability = data.powers.durability
            hero.powers.intelligence = data.powers.intelligence;
            hero.powers.power = data.powers.power;
            hero.powers.speed = data.powers.speed;
            hero.powers.strength = data.powers.strength;
        }

        if (hero.id == -1) {
            hero.imgaeUrl = "https://i.pinimg.com/originals/e6/4c/2b/e64c2b2e68f177e7ac1122fdfb0f8150.jpg";
            this.store.dispatch(new CreateHero(hero));
        }
        else
            this.store.dispatch(new EditHero(hero));

        this.onSave.emit();
    }
}
