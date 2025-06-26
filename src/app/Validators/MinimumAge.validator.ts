import { AbstractControl, ValidationErrors } from '@angular/forms';

export function MinimumAge(control: AbstractControl): ValidationErrors | null {
  const date = control.value;

  if (date) {

    let inputDate;
    if (typeof date == 'string') {
      const formatedDate = date.split('-');
      inputDate = new Date(
        parseInt(formatedDate[2]),
        parseInt(formatedDate[1]) - 1,
        parseInt(formatedDate[0])
      );
    } else {
      inputDate = new Date(date);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    const diffInMs = today.getTime() - inputDate.getTime();
    const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365);
    // console.log(diffInMs);
    
    if (diffInYears >= 10) {
      return null;
    } else if(diffInMs < 0 || diffInMs < 10){

      return {
        MinimumAge: 'Candidate should be atleast 10 years old',
      };
    }
  }

  return null;
}
