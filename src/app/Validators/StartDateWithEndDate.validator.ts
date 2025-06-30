import { AbstractControl, ValidationErrors } from "@angular/forms";

export function StartDateWithEndDate(control : AbstractControl) : ValidationErrors | null {
    const parent = control.parent;
    const endDate  = control?.get('enddate')?.value;
    const startDate = control?.get('startdate')?.value;

    if(endDate && startDate ) {
        let inputStartDate = startDate;
        let inputEndDate = endDate;

        if(typeof(startDate) == 'string'){
            const formatedDate = startDate.split('-')
            inputStartDate = new Date(parseInt(formatedDate[2]), parseInt(formatedDate[1])-1, parseInt(formatedDate[0]))
       
        }
        if(typeof(endDate) == 'string'){
            const formatedDate = endDate.split('-')
            inputEndDate = new Date(parseInt(formatedDate[2]), parseInt(formatedDate[1])-1, parseInt(formatedDate[0]))
          
        }
        inputStartDate.setHours(0, 0, 0, 0);
        inputEndDate.setHours(0, 0, 0, 0);
       
        const diffInMs = inputEndDate.getTime() - inputStartDate.getTime()

        console.log(inputEndDate);
        console.log(inputStartDate);
        
        

        console.log(diffInMs);
        

        if(diffInMs <= 0) {
            return ({
                EndDateGreaterThanStartDate : 'Start Date should be less than End Date'
            })
        } 
        
    }

    return null;
}