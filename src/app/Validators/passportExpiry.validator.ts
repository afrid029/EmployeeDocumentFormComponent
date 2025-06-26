import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passportExpiry(checkWith: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const parent = control.parent;
    const expiry = control.parent?.get('expiry')?.value;
    const dob = parent?.get(checkWith)?.value;
    // console.log(typeof(expiry), typeof(dob));
    let dobDate;
    let expiryDate;

    if (typeof dob == 'string') {
      const formatedDate = dob.split('-');
      dobDate = new Date(
        parseInt(formatedDate[2]),
        parseInt(formatedDate[1]) - 1,
        parseInt(formatedDate[0])
      );
    } else {
      dobDate = new Date(dob);
    }

    if (typeof expiry == 'string') {
      const formatedDate = expiry.split('-');
      expiryDate = new Date(
        parseInt(formatedDate[2]),
        parseInt(formatedDate[1]) - 1,
        parseInt(formatedDate[0])
      );
    } else {
      expiryDate = new Date(expiry);
    }

    if (expiryDate.getTime() - dobDate.getTime() < 0) {
      // console.log('expifdsdsd');
      return {
        passportExpiry:
          'Passport Expiry Dates should not be less than Date Of Birth',
      };
    }

    return null;
  };
}
