import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,FormArray } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  
  
  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.setupTabNavigation();
    this.propertyForm;
      
  }

  
  propertyForm= new FormGroup({
    //first tab
    phone:new FormControl("",[Validators.required,Validators.pattern('^[7-9]{1}[0-9]{9}$')]),
    email:new FormControl("",[Validators.required,Validators.email]),


    //second tab
    name:new FormControl("",[Validators.required]),
    address1:new FormControl("",[Validators.required]),
    aptNumber:new FormControl("",[Validators.required]),
    city:new FormControl("",[Validators.required]),
    state:new FormControl("",[Validators.required]),
    country:new FormControl("",[Validators.required]),
    zipcode:new FormControl("",[Validators.required]),
    area:new FormControl("",[Validators.required]),
    appartmentType:new FormControl("",[Validators.required]),
    amenities:new FormControl(""),
    
    //third tab
    
    description:new FormControl("",[Validators.required]),
    features:new FormControl("",[Validators.required]),


    //fourth tab
    Neighbourhood_Description:new FormControl("",[Validators.required]),
    schoolname:new FormControl("",[Validators.required]),
    schooladdress:new FormControl("",[Validators.required]),
    school_distance: new FormControl("",[Validators.required]),
    school_type: new FormControl("",[Validators.required]),
    school_rating: new FormControl("",[Validators.required]),
    hospital_name: new FormControl("",[Validators.required]),
    hospital_address: new FormControl("",[Validators.required]),
    hospital_distance: new FormControl("",[Validators.required]),
    hospital_type: new FormControl("",[Validators.required]),
    hospital_rating: new FormControl("",[Validators.required]),


    neighbourhoods: this.fb.array([this.createNeighbourhood()]),

    //fith tab
    price:new FormControl("",[Validators.required]),
    usable_area:new FormControl("",[Validators.required]),
    measure_Unit:new FormControl("",[Validators.required]),
    avaialble_From:new FormControl("",[Validators.required]),
    furnishing:new FormControl("",[Validators.required]),
    highlights:new FormControl([]),
    other_highlights:new FormControl("",[Validators.required]),

    //sixth tab
    image:new FormControl("",[Validators.required]),
    floor_plan: new FormControl("",[Validators.required]),

})
get neighbourhoods(): FormArray {
  return this.propertyForm.get('neighbourhoods') as FormArray;
}
createNeighbourhood(): FormGroup {
  return this.fb.group({
    schoolname: new FormControl("", [Validators.required]),
    schooladdress: new FormControl("", [Validators.required]),
    school_distance: new FormControl("", [Validators.required]),
    school_rating: new FormControl("", [Validators.required]),
    school_type: new FormControl("", [Validators.required]),

    hospital_name: new FormControl("", [Validators.required]),
    hospital_address: new FormControl("", [Validators.required]),
    hospital_distance: new FormControl("", [Validators.required]),
    hospital_rating: new FormControl("", [Validators.required]),
    hospital_type: new FormControl("", [Validators.required]),
  });
}
 // Add a new neighbourhood (school/hospital) form group
 addNeighbourhood(): void {
  this.neighbourhoods.push(this.createNeighbourhood());
}

// Remove a neighbourhood form group
removeNeighbourhood(index: number): void {
  this.neighbourhoods.removeAt(index);
}







//butttons
setupTabNavigation() {
  // Wait for DOM to be fully loaded
  setTimeout(() => {
    // Handle next button clicks
    const nextButtons = document.querySelectorAll('.next-btn');
    nextButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const targetTab = (event.currentTarget as HTMLElement).getAttribute('data-target');
        if (targetTab) {
          // Validate current tab before proceeding
          if (this.validateCurrentTab(event)) {
            // Manually trigger the bootstrap tab
            const tabElement = document.querySelector(targetTab) as HTMLElement;
            const tab = new bootstrap.Tab(tabElement);
            tab.show();
          }
        }
      });
    });

    // Handle back button clicks
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const targetTab = (event.currentTarget as HTMLElement).getAttribute('data-target');
        if (targetTab) {
          // Manually trigger the bootstrap tab
          const tabElement = document.querySelector(targetTab) as HTMLElement;
          const tab = new bootstrap.Tab(tabElement);
          tab.show();
        }
      });
    });
  }, 500);
}

validateCurrentTab(event: Event): boolean {
  // Get current tab
  const button = event.currentTarget as HTMLElement;
  const currentTab = button.closest('.tab-pane');
  const currentTabId = currentTab?.id;

  // Run specific validation based on the current tab
  switch (currentTabId) {
    case 'Basic-Info':
      return this.validatePersonalDetailsTab();
    case 'Property-Details':
      return this.validatePropertyDetailsTab();
    case 'About-property':
      return this.validateAboutPropertyTab();
    case 'Neighbourhood':
      return this.validateNeighbourhoodTab();
    case 'Units':
      return this.validateUnitsTab();
    case 'Images':
      return this.validateImagesTab();
    default:
      return true;
  }
}

validatePersonalDetailsTab(): boolean {
  const phoneControl = this.propertyForm.get('phone');
  const emailControl = this.propertyForm.get('email');

  if (phoneControl?.invalid || emailControl?.invalid) {
    phoneControl?.markAsTouched();
    emailControl?.markAsTouched();
    alert('Please fill in all required Personal Details correctly');
    return false;
  }
  return true;
}

validatePropertyDetailsTab(): boolean {
  // Check specific fields in the property details tab
  const requiredControls = ['name', 'address1', 'aptNumber', 'city', 'state', 'country', 'zipcode', 'area', 'type'];
  
  for (const controlName of requiredControls) {
    const control = this.propertyForm.get(controlName);
    if (control?.invalid) {
      control.markAsTouched();
      alert('Please fill in all required Property Details correctly');
      return false;
    }
  }
  return true;
}

validateAboutPropertyTab(): boolean {
  const requiredControls = ['title', 'description', 'features'];
  
  for (const controlName of requiredControls) {
    const control = this.propertyForm.get(controlName);
    if (control?.invalid) {
      control.markAsTouched();
      alert('Please fill in all required About Property details correctly');
      return false;
    }
  }
  return true;
}


validateNeighbourhoodTab(): boolean {
  const neighbourhoodArray = this.propertyForm.get('neighbourhoods') as FormArray;

  for (let i = 0; i < neighbourhoodArray.length; i++) {
    const neighbourhoodGroup = neighbourhoodArray.at(i) as FormGroup;
    const schoolnameControl = neighbourhoodGroup.get('schoolname');
    const hospitalnameControl = neighbourhoodGroup.get('hospital_name');
    const schoolDistanceControl = neighbourhoodGroup.get('school_distance');
    const hospitalDistanceControl = neighbourhoodGroup.get('hospital_distance');

    if (
      schoolnameControl?.invalid ||
      hospitalnameControl?.invalid ||
      schoolDistanceControl?.invalid ||
      hospitalDistanceControl?.invalid
    ) {
      schoolnameControl?.markAsTouched();
      hospitalnameControl?.markAsTouched();
      schoolDistanceControl?.markAsTouched();
      hospitalDistanceControl?.markAsTouched();
      alert('Please fill in all required Neighbourhood details correctly');
      return false;
    }
  }

  return true;
}

validateUnitsTab(): boolean {
  const requiredControls = ['price', 'usableArea', 'measureUnit', 'availableFrom', 'furnishing'];
  
  for (const controlName of requiredControls) {
    const control = this.propertyForm.get(controlName);
    if (control?.invalid) {
      control.markAsTouched();
      alert('Please fill in all required Unit details correctly');
      return false;
    }
  }
  return true;
}

validateImagesTab(): boolean {
  // For images tab, we might want to check if at least one image is uploaded
  const roomImagesControl = this.propertyForm.get('roomImages');
  if (roomImagesControl?.value === 0) {
    alert('Please upload at least one room image');
    return false;
  }
  return true;
}














 onSubmit(){

  console.log("Form submitted succesfully")
  console.log(this.propertyForm);

 }

  
}

 


  
 
  
 
 


 
