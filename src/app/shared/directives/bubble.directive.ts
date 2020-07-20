import { Directive, ElementRef, HostListener, Input, OnInit } from "@angular/core"

@Directive({
    selector: '[bubble]'
})
export class BubbleDirective implements OnInit {
    @Input('bubble') out: ElementRef;

    constructor(private host: ElementRef) {
        this.host.nativeElement.classList.add("range");
        this.host.nativeElement.parentElement.classList.add("range-wrap");
    }

    ngOnInit() {
        //debugger;
    }

    @HostListener("input")
    onInputChange() {
        let he = this.host.nativeElement;
        let be = <any>this.out;
        let pw = he.parentElement.getBoundingClientRect().width;

        const val = he.value;
        const max = he.max ? he.max : 100;
        const newVal = Number(pw * (val / max));

        be.innerHTML = val;
        be.style.left = `calc(${newVal}px + (${25 - newVal * 0.15}px))`;
    }
}
