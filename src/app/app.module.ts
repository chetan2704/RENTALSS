import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PriceComponent } from './price/price.component';
import { HelpcentreComponent } from './helpcentre/helpcentre.component';
import { BarComponent } from './bar/bar.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewAddPropertyComponent } from './new-add-property/new-add-property.component';


@NgModule({
  declarations: [
    AppComponent,
    PriceComponent,
    HelpcentreComponent,
    BarComponent,
    AddPropertyComponent,
    NewAddPropertyComponent,
    
  
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
