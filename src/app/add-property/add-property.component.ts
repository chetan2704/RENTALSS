import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  propertyForm!: FormGroup; // Using the definite assignment assertion
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.setupTabNavigation();
  }

  initForm() {
    this.propertyForm = this.fb.group({
      // Personal details tab
      phone: ['', [Validators.required, Validators.pattern('[6-9]{1}-[0-9]{9}')]],
      email: ['', [Validators.required, Validators.email]],
      
      // Property details tab
      name: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]],
      address1: ['', Validators.required],
      aptNumber: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zipcode: ['', Validators.required],
      area: ['', Validators.required],
      type: ['', Validators.required],
      amenities: [[]],
      officeHours: ['', [Validators.required, Validators.pattern('[6-9][0-9]{9}')]],
      officeEmail: ['', [Validators.required, Validators.email]],
      
      // About property tab
      title: ['', Validators.required],
      description: ['', Validators.required],
      features: ['', Validators.required],
      
      // Neighbourhood tab
      neighbourhoodDetails: ['', Validators.required],
      school: ['', Validators.required],
      schoolAddress: ['', Validators.required],
      schoolDistance: ['', Validators.required],
      schoolType: ['', Validators.required],
      schoolRating: [null, [Validators.min(0), Validators.max(10)]],
      hospital: ['', Validators.required],
      hospitalAddress: ['', Validators.required],
      hospitalDistance: ['', Validators.required],
      hospitalType: ['', Validators.required],
      hospitalRating: [null, [Validators.min(0), Validators.max(10)]],
      
      // Units tab
      price: [null, Validators.required],
      usableArea: [null, Validators.required],
      measureUnit: ['', Validators.required],
      availableFrom: [null, Validators.required],
      furnishing: ['', Validators.required],
      highlights: [[]],
      otherHighlights: [''],
      
      // Images tab
      roomImages: [[]],
      floorPlanImage: [null]
    });
  }

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
    // Simplified validation for neighbourhood tab
    const requiredControls = ['neighbourhoodDetails', 'school', 'hospital'];
    
    for (const controlName of requiredControls) {
      const control = this.propertyForm.get(controlName);
      if (control?.invalid) {
        control.markAsTouched();
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
    if (roomImagesControl?.value.length === 0) {
      alert('Please upload at least one room image');
      return false;
    }
    return true;
  }

  submitForm() {
    if (this.propertyForm.valid) {
      console.log('Form submitted:', this.propertyForm.value);
      // Handle your form submission logic here
      alert('Property details submitted successfully!');
    } else {
      // Mark all form controls as touched to trigger validation display
      this.markFormGroupTouched(this.propertyForm);
      alert('Please fill all required fields correctly before submitting.');
    }
  }

  // Helper method to mark all controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Handle file uploads for images
  onFileChange(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    
    if (files && files.length > 0) {
      if (controlName === 'roomImages') {
        // For multiple images
        const currentImages = this.propertyForm.get(controlName)?.value || [];
        this.propertyForm.patchValue({
          [controlName]: [...currentImages, ...Array.from(files)]
        });
      } else {
        // For single image (like floorPlanImage)
        this.propertyForm.patchValue({
          [controlName]: files[0]
        });
      }
    }
  }
}