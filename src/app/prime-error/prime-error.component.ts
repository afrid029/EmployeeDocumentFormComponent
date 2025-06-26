import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, signal } from '@angular/core';
import { ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-prime-error',
  templateUrl: './prime-error.component.html',
  styleUrls: ['./prime-error.component.scss'],
  imports : [CommonModule]
})
export class PrimeErrorComponent implements OnInit, OnChanges {
  @Input() errors: Record<string, ValidationErrors > | null = {};
  @Input() customErrorMessages: Record<string, string> | any = {};
  @Input() direction: 'ltr' | 'rtl' = 'ltr';

  errorMessages = signal<Record<string, string>>({});

  ngOnInit(): void {
    this.setErrorMessages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customErrorMessages'] && changes['customErrorMessages'].currentValue || (changes['errors'] && changes['errors'].currentValue) ) {
      this.setErrorMessages();
    }
    
  }


  setErrorMessages(): void {
    const baseErrorMessages = {
      required: 'This field is required.',
      email: 'Invalid email address.',
      pattern: 'Invalid format.',
      maxlength: 'Exceeded maximum length.',
      minlength: 'Below minimum length.',
      emptyString: 'This field cannot be empty.',
      passwordDoesNotMatch: 'Passwords do not match.',
    };

    Object.keys(this.errors!).forEach((er) => {
      const inc = Object.keys(baseErrorMessages).includes(er)
      if(!inc) {
        this.customErrorMessages[er]! = this.errors?.[er];
      }
    })
    this.errorMessages.set({
      ...baseErrorMessages,
      ...this.customErrorMessages,
    });

    // console.log(this.errors);
    
  }
}
