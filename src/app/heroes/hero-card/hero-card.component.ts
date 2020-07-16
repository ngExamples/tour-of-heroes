import { Component, Input, Output, EventEmitter } from "@angular/core"
import { Hero } from 'app/core/export.models';

@Component({
    selector: 'hero-card',
    templateUrl: 'hero-card.component.html'
})
export class HeroCardComponent {
    @Input() hero: Hero;
    @Output() onDelete = new EventEmitter();
    @Output() onEdit = new EventEmitter();
}
