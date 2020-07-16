import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from 'app/core/core.module'
import { SharedModule } from 'app/shared/shared.module'

import { HomeComponent } from './home/home.component';
import { HeroCardComponent } from './hero-card/hero-card.component'

@NgModule({
    imports: [
        CoreModule,
        SharedModule,
        BrowserModule
    ],
    declarations: [
        HomeComponent,
        HeroCardComponent
    ],
    bootstrap: [ HomeComponent ]
})
export class HeroesModule { }
