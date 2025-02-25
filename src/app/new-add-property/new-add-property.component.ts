import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-new-add-property',
  templateUrl: './new-add-property.component.html',
  styleUrls: ['./new-add-property.component.css']
})
export class NewAddPropertyComponent implements OnInit {

  propertyForm!: FormGroup;
  amenitiesList = ['Pets care', 'Laundry', 'Fitness Area', 'Playing Area','pool','club house','CourtYard'];
  featureList = ['WiFi', 'Air Conditioner', 'Pets Allowed', 'Balcony', 'Modular Kitchen', 
                  'Wheel Chair Access', 'Internet Access', 'Watchman', 'Transport'];
  highlightList:string[]=['Good Connectivity','Dry Cleaning Service','Lounge','Closets','Good view','Super Markets']

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.propertyForm = this.fb.group({
      //first tab
      

      //second tab
      propertyDetails:this.fb.group({

        name: ['', Validators.required],
        address: this.fb.group({
        address1: ['', Validators.required],
        aptNumber: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required]
       }),
       thumbnail:this.fb.group({
        area:['',Validators.required],
        type:['',Validators.required],
        parking:['',Validators.required]
        
       }),
       amenities: this.fb.array(this.amenitiesList.map(() => this.fb.control(false))),
       officeHours: this.fb.group({
        time: ['9:00am -6:00pm', Validators.required],
        timeZone: ['CST', Validators.required],
        workingDays: this.fb.array(['Monday','tuesday'])
      }),
      contactUs: this.fb.group({
        
        phone: ['', Validators.required],
        email: ['', Validators.required]
      }),

       
      }),
      // amenities: this.fb.array(this.amenitiesList.map(() => this.fb.control(false))),

      
      //third tab
      aboutUs: this.fb.group({
        description: ['', Validators.required],
        highlights: this.fb.group({
          features: this.fb.array(this.featureList.map(() => this.fb.control(false)))
        }),
      }),
      
      
      //Tab 4
      neighborHood: this.fb.group({
        description: ['', Validators.required],
        education: this.fb.group({
          title: ['schools', Validators.required],
          details: this.fb.array([])
           }),
        hospital: this.fb.group({
          title: ['hospital', Validators.required],
          details: this.fb.array([])
        })
      }),

      //tab5
        availableUnits: this.fb.group({
       
        rows: this.fb.array([]),
        
       }),

     
    
      
      

      // Tab 6
      imgGallery:this.fb.group({
         img1:['',Validators.required],
         img2:['',Validators.required],
         img3:['',Validators.required],
         floorplan:this.fb.group({
           img1:['',Validators.required]
         })
      })
      

     
      
    });
    
    this.addAvailableUnitsRow();
    this.addEducationDetail();
    this.addHospitalDetail();
    
   
  }

   

  get amenities() {
    return this.propertyForm.get('propertyDetails.amenities') as FormArray;
  }
  logSelectedAmenities() {
    const selectedAmenities = this.amenities.controls
      .map((control, i) => control.value ? this.amenitiesList[i] : null)
      .filter(value => value !== null);
    return selectedAmenities;
  }
  get officeHoursWorkingDays() {
    return this.propertyForm.get('officeHours')?.get('workingDays') as FormArray;
  }

  get aboutUsDetails() {
    return this.propertyForm.get('aboutUs.highlights.features') as FormArray;
  }
  logSelectedfeature() {
    const selectedfeature = this.aboutUsDetails.controls
      .map((control, i) => control.value ? this.featureList[i] : null)
      .filter(value => value !== null);
    return selectedfeature;
  }
  
  get availableUnitsRows(): FormArray {
    return this.propertyForm.get('availableUnits')?.get('rows') as FormArray;
  }
 
  get highlights():FormArray{
    return this.propertyForm.get('availableUnits.rows.highlights') as FormArray;
  }
 
  logSeletedhighlight() {
    const selectedhighlight = this.highlights.controls
      .map((control, i) => control.value ? this.featureList[i] : null)
      .filter(value => value !== null);
    return selectedhighlight;
  }
  
  get kitchen():FormArray{
    return this.propertyForm.get('availableUnits')?.get('kitchen') as FormArray;
  }
  

  get neighborHoodDetails() {
    return this.propertyForm.get('neighborHood')?.get('details') as FormArray;
  }

 
  get educationDetails() {
    return this.propertyForm.get('neighborHood.education.details') as FormArray;
  }

  get hospitalDetails() {
    return this.propertyForm.get('neighborHood.hospital.details') as FormArray;
  }

  get imgGalleryDetails(){
    return this.propertyForm.get('imgGallery')?.get('details') as FormArray;

  }
   
  addAvailableUnitsRow() {
    this.availableUnitsRows.push(this.fb.group({
      unit: ['', Validators.required],
      price: ['', Validators.required],
      usableArea: ['', Validators.required],
      measureUnit: ['', Validators.required],
      availableFrom: ['', Validators.required],
      furnishing:this.fb.group({
        type:['',Validators.required]
      }),
      //highlights: this.fb.array(this.highlightList.map(() => this.fb.control(false))),
      highlights:this.fb.array(['cake','biscuit','tea']),
      kitchen:this.fb.array([])
    }));
  }
  removeAvailableUnitsRow(index: number) {
    this.availableUnitsRows.removeAt(index);
  }
   
  

  addEducationDetail() {
    this.educationDetails.push(this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      distance: ['', Validators.required],
      type: ['', Validators.required],
      rating: ['', Validators.required]
    }));
  }

  removEducationDetail(index:number){
    this.educationDetails.removeAt(index);

  }

  addHospitalDetail() {
    this.hospitalDetails.push(this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      distance: ['', Validators.required],
      type: ['', Validators.required],
      rating: ['', Validators.required]
    }));
  }
  removeHospitalDetail(index:number){
    this.hospitalDetails.removeAt(index);

  }


  onSubmit() {

    const formValue = this.propertyForm.value;
    formValue.propertyDetails.amenities = this.logSelectedAmenities();
    formValue.aboutUs.highlights.features = this.logSelectedfeature();
    
    
    
    
  
    
    
    alert("Form Submitted!");
   
  console.log(this.propertyForm.value);
  
  }
}
