import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { NgxsModule } from '@ngxs/store';

import { SERVICES } from './export.services'
import { PROVIDERS } from './export.providers'
import { STATES } from './export.states'
import { config } from '../../configs/config';

@NgModule({
    imports: [
        HttpClientModule,
        NgxsModule.forRoot(STATES, { developmentMode: !config.production })
    ],
    providers: [...SERVICES, ...PROVIDERS, ...STATES ]
})
export class CoreModule { }
