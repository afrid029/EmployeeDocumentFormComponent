import { formatDate } from "@angular/common";
import { AbstractControl, ValidationErrors } from "@angular/forms";

export function MaximumAge(control: AbstractControl): ValidationErrors | null {
  const date = control.value;

  if(date){

    let inputDate;
    if(typeof(date) == 'string'){
      const formatedDate = date.split('-')
      inputDate = new Date(parseInt(formatedDate[2]), parseInt(formatedDate[1])-1, parseInt(formatedDate[0]))
      

    } else {

      inputDate = new Date(date);
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    
    const diffInMs = today.getTime() - inputDate.getTime();
    const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365);

     if(diffInMs < 0){
      return null;
    }
  
    if (diffInYears <= 100) {
        return null;
    
    }
      return {
        MaximumAge: 'Candidate Age should not be greater than 100'
      };

  }  

  return null
  // const formatedDate = formatDate(date, 'dd/mm/yy', 'en-US')

}