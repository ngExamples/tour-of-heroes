import { Component, Input, Output, EventEmitter } from "@angular/core"

@Component({
    selector: "pager",
    templateUrl: "pager.component.html"
})
export class PagerComponent {
    private visibleRange: number = 5;
    private currentPage: number = 1;
    private totalPages: number = 1
    @Output() pageChanged = new EventEmitter<number>();

    @Input() set current(value: number) {
        value = parseInt(value.toString());
        if (value == this.currentPage)
            return;
        
        if (value < 1)
            this.currentPage = 1;
        else if (value > this.totalPages)
            this.currentPage = this.totalPages;
        else
            this.currentPage = value;

        this.pageChanged.emit(value)
    }

    get current() {
        return this.currentPage;
    }

    @Input() set total(value: number) {
        value = parseInt(value.toString());
        if (this.totalPages == value)
            return;

        if (value < 0)
            value = 1;
        
        this.totalPages = value;

        if (value < this.currentPage)
            this.currentPage = value;
    }

    get total() {
        return this.totalPages;
    }

    getRange() {
        let list: number[] = [];
        let start: number, end: number;

        const mid = this.visibleRange >> 1;

        if (this.currentPage <= mid) {
            start = 1;
            end = this.visibleRange
        }
        else if (this.currentPage > this.totalPages - mid) {
            start = this.totalPages - this.visibleRange + 1;
            end = this.totalPages
        }
        else {
            start = this.currentPage - mid;
            end = start + this.visibleRange - 1;
        }

        for(;start <= end; ++start) {
            list.push(start);
        }

        return list;
    }
}
