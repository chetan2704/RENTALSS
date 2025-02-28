import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, Form } from '@angular/forms';
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
       thumbnail:['',Validators.required],
        area:['',Validators.required],
        type:['',Validators.required],
        parking:['',Validators.required],
        size:['',Validators.required],
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
      
      communityAmenities:this.fb.group({
        features:this.fb.array([])
      }),

      apartmnetFeatures:this.fb.group({
        features:this.fb.array([])

      }),
      
      aboutUs: this.fb.group({
        description: ['', Validators.required],
        details:['',Validators.required],
         }),

      highlights:this.fb.group({
        features:this.fb.array(this.featureList.map(() => this.fb.control(false)))
      }),
      
      //Tab 4
      neighborHood: this.fb.group({
        description: ['', Validators.required],
        details:['',Validators.required],
        }),

      education: this.fb.group({
        title: ['schools', Validators.required],
        details: this.fb.array([
          this.createEduDetailGroup(),
        ])
         }),
         
      hospital: this.fb.group({
          title: ['hospital', Validators.required],
          details: this.fb.array([
            this.createHosDetailGroup(),
          ])
        }),

      transportation:this.fb.group({
        title:['Transportation',Validators.required],
        details:this.fb.array([this.createTransportDetailGroup()])

      }),

      availableUnits:this.fb.group({
        rows:this.fb.array([
          this.createAvailableUnitsGroup()])
       }),

      imgGallery:this.fb.group({
        imageGallery:this.fb.array([
          this.createImageGalleryGroup('ImageGallery'),
          this.createImageGalleryGroup('Photos'),
          this.createImageGalleryGroup('floorplan')
          

        ]),

      })


    });
    
  }

  createEduDetailGroup():FormGroup{
    return this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      distance: ['', Validators.required],
      type: ['', Validators.required],
      rating: ['', Validators.required]

    })
  }
  createHosDetailGroup():FormGroup{
    return this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      distance: ['', Validators.required],
      type: ['', Validators.required],
      rating: ['', Validators.required]

    })

  }
   createTransportDetailGroup():FormGroup{
    return this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      distance: ['', Validators.required],
      type: ['', Validators.required],
      rating: ['', Validators.required]

    })

   }
  createAvailableUnitsGroup():FormGroup{
    return this.fb.group({
      unit:['',Validators.required],
      price:['',Validators.required],
      usableArea:['',Validators.required],
      measureUnit:['',Validators.required],
      availableFrom:['',Validators.required],
      furnishing:this.fb.group({
        type:['',Validators.required]
      }),
      highlights:this.fb.array(this.highlightList.map(() => this.fb.control(false))),
      kitchen:this.fb.array([])

    })
    }

    createImageGalleryGroup(type:string):FormGroup{
     return this.fb.group({
       type:['',Validators.required],
       images:this.fb.array([
        this.fb.group({
          url:['',Validators.required],
          alt:['',Validators.required]
        })
       ])
     })
    }
   

    get images(){
      return this.propertyForm.get('imgGallery.imageGallery') as FormArray;
    }
  //amenities
  get amenities() {
    return this.propertyForm.get('propertyDetails.amenities') as FormArray;
  }
  logSelectedAmenities() {
    const selectedAmenities = this.amenities.controls
      .map((control, i) => control.value ? this.amenitiesList[i] : null)
      .filter(value => value !== null);
    return selectedAmenities;
  }
//features 
  get features(){
    return this.propertyForm.get('highlights.features') as FormArray;
  }
  logselectedFeatures(){
    const selectedFeatures =this.features.controls
    .map((control,i) => control.value ? this.featureList[i] :null)
    .filter(value => value!== null);
    return selectedFeatures;
  }
///parking
  get parking(){
    return this.propertyForm.get('propertyDetails.parking') as FormArray;
  }

  //education
  get educationDetails(){
    return this.propertyForm.get('education.details') as FormArray;
  }
  addeducationDetail(){
    this.educationDetails.push(this.createEduDetailGroup());
  }
  removeEduDetail(index: number) {
    if (index > 0) {
      this.educationDetails.removeAt(index);
    }
  }

  //hospital
  get hospitalDetails(){
    return this.propertyForm.get('hospital.details') as FormArray;
  }
  addhospitalDetail(){
    this.hospitalDetails.push(this.createHosDetailGroup());
  }
  removeHosDetail(index:number){
    if(index > 0){
      this.hospitalDetails.removeAt(index);
    }
  }

  //tranposrtation
  get transportDetails(){
    return this.propertyForm.get('transportation.details') as FormArray;
  }
  addTransport(){
    this.transportDetails.push(this.createHosDetailGroup());
  }
  removeTransDetail(index:number){
    if(index >0){
      this.transportDetails.removeAt(index);
    }
  }
// available units
  get availableUnits(){
    return this.propertyForm.get('availableUnits.rows') as FormArray;
   }

  getHighlightsForRow(rowIndex: number) {
    return (this.availableUnits.at(rowIndex) as FormGroup).get('highlights') as FormArray;
  }

   logselectedHighlights(rowIndex:number){
    const row = (this.propertyForm.get('availableUnits.rows') as FormArray).at(rowIndex);
    const highlightsArray = row.get('highlights') as FormArray;

    const selectedhighlights = highlightsArray.controls
    .map((control, i) => control.value ? this.highlightList[i] : null)
    .filter(value => value !== null);
    
  return selectedhighlights;
   }

   addHighlights(){
    this.availableUnits.push(this.createAvailableUnitsGroup());
   }
   removeHighlights(index:number){
    
      this.availableUnits.removeAt(index);
    
   }
//images




  onSubmit() {
    const formValue = this.propertyForm.value;
    formValue.propertyDetails.amenities = this.logSelectedAmenities();
    formValue.highlights.features=this.logselectedFeatures();
    
    this.availableUnits.controls.forEach((row, index) => {
      formValue.availableUnits.rows[index].highlights = this.logselectedHighlights(index);
    });
    
    
    
    alert("Form Submitted!");
   
  console.log(this.propertyForm.value);
  
  }
}
