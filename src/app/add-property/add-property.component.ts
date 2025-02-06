import { Component,ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
 

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent  {
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;

  selectTab(tabId: number) {
    console.log('Tab clicked:', tabId); // Add this to debug
    if (this.staticTabs?.tabs[tabId]) {
      this.staticTabs.tabs[tabId].active = true;
    }
  }
}