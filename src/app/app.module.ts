import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PriceComponent } from './price/price.component';
import { HelpcentreComponent } from './helpcentre/helpcentre.component';
import { BarComponent } from './bar/bar.component';
import { AddPropertyComponent } from './add-property/add-property.component';

@NgModule({
  declarations: [
    AppComponent,
    PriceComponent,
    HelpcentreComponent,
    BarComponent,
    AddPropertyComponent
  ],
  imports: [
    BrowserModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
