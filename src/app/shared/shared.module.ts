import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { COMPONENTS } from './export.components'
import { DIRECTIVES } from './export.directives'

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...COMPONENTS, ...DIRECTIVES
    ],
    exports: [
        ...COMPONENTS, ...DIRECTIVES
    ]
})
export class SharedModule { }
