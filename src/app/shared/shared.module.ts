import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { COMPONENTS } from './export.components'

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ]
})
export class SharedModule { }
