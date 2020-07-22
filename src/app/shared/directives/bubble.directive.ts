import { Directive, ElementRef, HostListener, OnInit } from "@angular/core"

@Directive({
    selector: '[withbubble]'
})
export class BubbleDirective implements OnInit {
    outElement: HTMLOutputElement;

    constructor(private host: ElementRef) {
        this.host.nativeElement.classList.add("range");
        this.host.nativeElement.parentElement.classList.add("range-wrap");

        this.outElement = document.createElement("output");
        this.outElement.classList.add("bubble");
        this.outElement.htmlFor.add(host.nativeElement.id);
        host.nativeElement.parentElement.appendChild(this.outElement);
    }

    ngOnInit() {
        this.onInputChange();
    }

    @HostListener("input")
    onInputChange() {
        let he = this.host.nativeElement;
        let pw = he.parentElement.getBoundingClientRect().width;

        const val = he.value;
        const max = he.max ? he.max : 100;
        const newVal = Number(pw * (val / max));

        this.outElement.innerHTML = val;
        this.outElement.style.left = `calc(${newVal}px + (${25 - newVal * 0.15}px))`;
    }
}
