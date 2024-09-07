import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PriceComponent } from './price/price.component';
import { HelpcentreComponent } from './helpcentre/helpcentre.component';

@NgModule({
  declarations: [
    AppComponent,
    PriceComponent,
    HelpcentreComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
