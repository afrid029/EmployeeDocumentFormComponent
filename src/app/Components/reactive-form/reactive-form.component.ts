import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogStyle } from 'primeng/dynamicdialog';
import { PrimeInputComponent } from '../../prime-input/prime-input.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimeFilterDropdownComponent } from '../../prime-filter-dropdown/prime-filter-dropdown/prime-filter-dropdown.component';
import { PrimeDropdownComponent } from '../../prime-dropdown/prime-dropdown.component';
import { PrimeDatepickerComponent } from '../../prime-datepicker/prime-datepicker/prime-datepicker.component';
import { PrimeSelectButtonComponent } from '../../prime-select-button/prime-select-button.component';
import { PrimeInputNumberComponent } from '../../prime-input-number/prime-input-number.component';
import { ButtonComponent } from '../../prime-button/button/button.component';
import { GetDataService } from '../../Services/get-data.service';
import { DataLoaderComponent } from '../../data-loader/data-loader.component';
import { MessageService } from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';
import { ToastService } from '../../Services/toast.service';
import { StartDateWithEndDate } from '../../Validators/StartDateWithEndDate.validator';
import { GreaterThanDateValidator } from '../../Validators/GreaterThanDate.validator';
import { MinimumEmploymentPeriod } from '../../Validators/MinimumEmploymentPeriod.validator';
import { NotGreaterThanToday } from '../../Validators/NotGreaterThanToday.validator';

@Component({
  selector: 'app-reactive-form',
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    PrimeInputComponent,
    ReactiveFormsModule,
    PrimeFilterDropdownComponent,
    PrimeDropdownComponent,
    PrimeDatepickerComponent,
    PrimeSelectButtonComponent,
    PrimeInputNumberComponent,
    ButtonComponent,
    DataLoaderComponent,
    Toast,
    ToastModule
  ],

  providers : [],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
})
export class ReactiveFormComponent implements OnInit, AfterViewInit, OnDestroy {
  dynamicForm: FormGroup | undefined;
  disable = signal<boolean>(false);
  loading = signal<boolean>(false);
  dataLoaded = signal<boolean>(true);
  customErrors : Record<string,string[]> = {};

  employmentType = signal<Record<string, string>[]> ([
    { type: 'Full-Time' },
    { type: 'Part-Time' },
    { type: 'Temporary' },
    { type: 'Fixed-Term Contracts' },
  ]);

  countries = signal<Record<string, string>[]> ([
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
    { name: 'Australia' },
    { name: 'Austria' },
    { name: 'Bangaladesh' },
    { name: 'Canada' },
  ]);

  stateOptions = signal<Record<string, string>[]> ([
    { label: 'No', value: 'no' },
    { label: 'Yes', value: 'yes' },
  ]);
  minDate = signal<Date | undefined> (undefined);

  @Input() visible: boolean = true;
  @Input() editData: any = {};
  @Output() onClose = new EventEmitter();
  @Output() onCreate = new EventEmitter<any>();
  @Output() onUpdate = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private dataServ: GetDataService, private toastServ : ToastService) {}

  ngOnInit(): void {
    const dob = new Date(2020,4,24);
    const today = new Date();
    this.minDate.set (new Date(
      today.getFullYear() - 10,
      today.getMonth(),
      today.getDate()
    ));

    this.dynamicForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      position : new FormControl('', [Validators.required]),
      country : new FormControl('', [Validators.required]),
      employmenttype : new FormControl('', [Validators.required]),
      startdate : new FormControl('', [Validators.required,NotGreaterThanToday, GreaterThanDateValidator(dob)]),
      // startdate : new FormControl('', [Validators.required,NotGreaterThanToday, StartDateWithEndDate,MinimumEmploymentPeriod, GreaterThanDateValidator(dob)]),
      enddate : new FormControl('', [Validators.required,NotGreaterThanToday, GreaterThanDateValidator(dob)]),
      supervisor : new FormControl(''),
      email : new FormControl('', [Validators.email]),
      phone : new FormControl(null),
      iscurrent : new FormControl('no', [Validators.required]),
      contactcurrent : new FormControl('', [])
    }, {
      validators : [StartDateWithEndDate, MinimumEmploymentPeriod]
    });
    // this.dynamicForm.get('expiry')?.setValidators([passportExpiry('dob')]);
    this.loadCustomValidators();
  
  }

  loadCustomValidators() {
    this.customErrors['startdate'] = ['EndDateGreaterThanStartDate', 'MinimumEmploymentPeriod']
    if (this.dynamicForm) {
      this.dynamicForm?.get('iscurrent')?.valueChanges.subscribe((data) => {
        console.log(data);
        const endDate = this.dynamicForm?.get('enddate');
        if(data == 'yes') {
          endDate?.setValue(new Date());
          endDate?.disable();
          this.dynamicForm?.get('contactcurrent')?.addValidators(Validators.required);
          
          this.dynamicForm?.hasValidator(MinimumEmploymentPeriod) 
            ? this.dynamicForm?.removeValidators(MinimumEmploymentPeriod)
            : ''; 
          this.dynamicForm?.hasValidator(StartDateWithEndDate) 
            ? this.dynamicForm?.removeValidators(StartDateWithEndDate)
            : ''; 
          // this.dynamicForm?.get('startdate')?.updateValueAndValidity();


        } else {
          endDate?.enable();
           this.dynamicForm?.get('contactcurrent')?.removeValidators(Validators.required);
           this.dynamicForm?.get('contactcurrent')?.updateValueAndValidity();

            this.dynamicForm?.hasValidator(MinimumEmploymentPeriod) 
            ? ''
            : this.dynamicForm?.addValidators(MinimumEmploymentPeriod); 

            this.dynamicForm?.hasValidator(StartDateWithEndDate) 
            ? ''
            : this.dynamicForm?.addValidators(StartDateWithEndDate); 
        }
      });

      // this.dynamicForm?.get('enddate')?.valueChanges.subscribe(data => {
      //   const startDate = this.dynamicForm?.get('startdate');
      //   startDate?.touched 
      //     ? startDate.updateValueAndValidity()
      //     :'';
       
      // });

    }
  }

  ngAfterViewInit(): void {
    // console.log(this.editData);
    if (this.editData && this.editData.Id) {
      this.dataLoaded.set(false);
    
      setTimeout(() => {
         this.dynamicForm?.patchValue(this.editData);
      // this.dynamicForm?.get('dob')?.updateValueAndValidity(); 
      this.loadCustomValidators();
      this.dynamicForm?.markAllAsTouched();
      this.dynamicForm?.updateValueAndValidity();
      this.dataLoaded.set(true);
      }, 3000)
     
     
 
    }
  }
  ngOnDestroy(): void {
    this.editData = {};
  }
  getAllCountry() {
    this.dataServ.getCountry().subscribe((data) => {
      this.countries.set(data);
    });
  }

  onSubmit() {
    this.loading.set(true);
    console.log(this.dynamicForm?.value);
    
    if(this.dynamicForm?.invalid){
      
      
      this.toastServ.showToastError("Invalid", "There are validation issues in your submission. Please review the form and try again.")

      this.loading.set(false);
    }else {
     this.editData && this.editData.Id 
     ? this.onUpdate.emit(this.dynamicForm?.value)
     : this.onCreate.emit(this.dynamicForm?.value);
      this.onHide();
    }
   
  }

  onHide() {
    this.onClose.emit();
  }
}
