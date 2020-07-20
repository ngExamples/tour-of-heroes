import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from "@angular/forms"
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from 'app/core/core.module'
import { SharedModule } from 'app/shared/shared.module'

import { HomeComponent } from './home/home.component';
import { HeroCardComponent } from './hero-card/hero-card.component'
import { HeroFormComponent } from './hero-form/hero-form.component'

@NgModule({
    imports: [
        CoreModule,
        SharedModule,
        BrowserModule,
        ReactiveFormsModule
    ],
    declarations: [
        HomeComponent,
        HeroCardComponent,
        HeroFormComponent
    ],
    bootstrap: [ HomeComponent ]
})
export class HeroesModule { }
