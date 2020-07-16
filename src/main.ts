import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { HeroesModule } from 'app/heroes/heroes.module';
import { config } from 'configs/config';

if (config.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(HeroesModule)
  .catch(err => console.error(err));
