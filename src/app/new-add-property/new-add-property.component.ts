
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, Form } from '@angular/forms';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-new-add-property',
  templateUrl: './new-add-property.component.html',
  styleUrls: ['./new-add-property.component.css']
})
export class NewAddPropertyComponent implements OnInit{
  propertyForm!: FormGroup;
  apartmnetFeaturesList = ['Washer/Dryer', 'Air Conditioning','Dishwasher','High Speed Internet Access','Wi-Fi','Window Coverings',
    'Heating','Cable Ready','Granite Countertops','Kitchen','Refrigerator','Freezer','Office','Views','Skylights','Walk-In Closets',];

  kitchenList = ['Washer/Dryer','Air Conditioning','Dishwasher','High Speed Internet Access','Wi-Fi','Heating','Cable Ready']

  amenitiesList = ['Pets care', 'Laundry', 'Fitness Area', 'Playing Area', 'Pool', 'Club house', 'CourtYard'];

  featureList = ['WiFi', 'Air Conditioner', 'Pets Allowed', 'Balcony', 'Modular Kitchen',];

  highlightList: string[] = ['Good Connectivity', 'Dry Cleaning Service', 'Lounge', 'Closets', 'Good view', 'Super Markets'];

  WeeksList=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','Whole-weeks']

  
  constructor(private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.propertyForm = this.fb.group({

      propertyDetails: this.fb.group({
        name: ['',],
        address: this.fb.group({
          address1: ['',],
          aptNumber: ['',],
          city: ['',],
          zipCode: ['',],
          state: ['',],
          country: ['',]
        }),
        thumbnail: ['',],
        area: ['',],
        type: ['',],
        parking: ['',],
        size: ['',],
        amenities: this.fb.array(this.amenitiesList.map(() => this.fb.control(false))),

        officeHours: this.fb.group({
          time: ['',],
          timeZone: ['CST',],
          workingDays: this.fb.array([this.fb.control('')])
        }),
        contactUs: this.fb.group({
          phone: ['',],
          email: ['',]
        }),
      }),

      apartmnetFeatures: this.fb.group({
        features: this.fb.array(this.apartmnetFeaturesList.map(() => this.fb.control(false)))

      }),

      aboutUs: this.fb.group({
        description: ['',],
        details: ['',],
      }),

      highlights: this.fb.group({
        features: this.fb.array(this.featureList.map(() => this.fb.control(false)))
      }),

      neighborHood: this.fb.group({
        description: ['',],
        details: ['',],
      }),

      education: this.fb.group({
        title: ['schools',],
        details: this.fb.array([
          this.createNeighborHoodGroup(),
        ])
      }),

      hospital: this.fb.group({
        title: ['hospital',],
        details: this.fb.array([
          this.createNeighborHoodGroup(),
        ])
      }),

      transportation: this.fb.group({
        title: ['Transportation',],
        details: this.fb.array([this.createNeighborHoodGroup()])

      }),

      availableUnits: this.fb.group({
        rows: this.fb.array([
          this.createAvailableUnitsGroup()])
      }),

      imgGallery: this.fb.group({
        imageGallery: this.fb.array([
          this.createImageGalleryGroup('ImageGallery'),
          this.createImageGalleryGroup('Photos'),
          this.createImageGalleryGroup('floorplan')
        ]),
      })

    });

  }


  createNeighborHoodGroup(): FormGroup {
    return this.fb.group({
      name: ['',],
      address: ['',],
      distance: ['',],
      type: ['',],
      rating: ['',]

    })
  }

  createAvailableUnitsGroup(): FormGroup {
    return this.fb.group({
      unit: ['',],
      price: ['',],
      usableArea: ['',],
      measureUnit: ['',],
      configuration: ['',],
      availableFrom: ['',],
      furnishing: this.fb.group({
        type: ['',]
      }),
      highlights: this.fb.array(this.highlightList.map(() => this.fb.control(false))),
      kitchen: this.fb.array(this.kitchenList.map(() => this.fb.control(false))),

    })
  }

  createImageGalleryGroup(type: string): FormGroup {
    return this.fb.group({
      type: [type],
      images: this.fb.array([
        this.fb.group({
          url: ['',],
          alt: ['',]
        })
      ])
    })
  }
  get imageGalleryFormArray() {
    return this.propertyForm.get('imgGallery.imageGallery') as FormArray;
  }

  getImagesFormArray(index: number) {
    return this.imageGalleryFormArray.at(index).get('images') as FormArray;
  }

  addImage(index: number) {
    this.getImagesFormArray(index).push(this.fb.group({
      url: [''],
      alt: ['']
    }));
  }

  removeImage(groupIndex: number, imageIndex: number) {
    this.getImagesFormArray(groupIndex).removeAt(imageIndex);
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
  get highlights() {
    return this.propertyForm.get('highlights.features') as FormArray;
  }

  get apartmnetFeatures() {
    return this.propertyForm.get('apartmnetFeatures.features') as FormArray;
  }
  highlightsFeature(){
    const selectedFeatures =this.highlights.controls
    .map((control,i) => control.value ? this.featureList[i] :null)
    .filter(value => value!== null);
    return selectedFeatures;
  }
  logApartmnetFeatures(){
    const selectedFeatures =this.apartmnetFeatures.controls
    .map((control,i) => control.value ? this.apartmnetFeaturesList[i] :null)
    .filter(value => value!== null);
    return selectedFeatures;
  }
  ///parking
  get parking() {
    return this.propertyForm.get('propertyDetails.parking') as FormArray;
  }
  //weeks
  get weeks():FormArray{
    return this.propertyForm.get('propertyDetails.officeHours.workingDays') as FormArray;
  }
  logWorkingDays() {
    const selecteddays=this.weeks.value.filter((value: string) => value !== '');
    return selecteddays;
  }



  //education
  get educationDetails() {
    return this.propertyForm.get('education.details') as FormArray;
  }
  addeducationDetail() {
    this.educationDetails.push(this.createNeighborHoodGroup());
  }
  removeEduDetail(index: number) {
    if (index > 0) {
      this.educationDetails.removeAt(index);
    }
  }

  //hospital
  get hospitalDetails() {
    return this.propertyForm.get('hospital.details') as FormArray;
  }
  addhospitalDetail() {
    this.hospitalDetails.push(this.createNeighborHoodGroup());
  }
  removeHosDetail(index: number) {
    if (index > 0) {
      this.hospitalDetails.removeAt(index);
    }
  }

  //tranposrtation
  get transportDetails() {
    return this.propertyForm.get('transportation.details') as FormArray;
  }
  addTransport() {
    this.transportDetails.push(this.createNeighborHoodGroup());
  }
  removeTransDetail(index: number) {
    if (index > 0) {
      this.transportDetails.removeAt(index);
    }
  }
  // available units
  get availableUnits() {
    return this.propertyForm.get('availableUnits.rows') as FormArray;
  }

  getHighlightsForRow(rowIndex: number) {
    return (this.availableUnits.at(rowIndex) as FormGroup).get('highlights') as FormArray;
  }
  getKitchenForRow(rowIndex: number) {
    return (this.availableUnits.at(rowIndex) as FormGroup).get('kitchen') as FormArray;
  }

  logselectedHighlights(rowIndex: number) {
    const row = (this.propertyForm.get('availableUnits.rows') as FormArray).at(rowIndex);
    const highlightsArray = row.get('highlights') as FormArray;

    const selectedhighlights = highlightsArray.controls
      .map((control, i) => control.value ? this.highlightList[i] : null)
      .filter(value => value !== null);

    return selectedhighlights;
  }
  logselectedKitchen(rowIndex: number) {
    const row = (this.propertyForm.get('availableUnits.rows') as FormArray).at(rowIndex);
    const kitchenArray = row.get('kitchen') as FormArray;

    const selectedhighlights = kitchenArray.controls
      .map((control, i) => control.value ? this.highlightList[i] : null)
      .filter(value => value !== null);

    return selectedhighlights;
  }

  addHighlights() {
    this.availableUnits.push(this.createAvailableUnitsGroup());
  }
  removeHighlights(index: number) {

    this.availableUnits.removeAt(index);

  }

  onSubmit() {
    const formValue = this.propertyForm.value;
    formValue.propertyDetails.amenities = this.logSelectedAmenities();
    formValue.highlights.features=this.highlightsFeature();
    formValue.apartmnetFeatures.features = this.logApartmnetFeatures();
    formValue.propertyDetails.officeHours.workingDays=this.logWorkingDays();


    this.availableUnits.controls.forEach((row, index) => {
      formValue.availableUnits.rows[index].highlights = this.logselectedHighlights(index);
      formValue.availableUnits.rows[index].kitchen = this.logselectedKitchen(index);
    });
    
    alert("Form Submitted!");
    console.log(this.propertyForm.value);

  }
}