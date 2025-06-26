import { AbstractControl, ValidationErrors } from "@angular/forms";

export function MinimumEmploymentPeriod(control : AbstractControl) : ValidationErrors | null {
    const parent = control.parent;
    const endDate  = parent?.get('enddate')?.value;
    const startDate = control?.value;

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
       
        const diffInMs = inputEndDate.getTime() - inputStartDate.getTime()

        const diffInMonths = diffInMs / (1000 * 60 * 60 * 24 * 30)
        if(diffInMonths < 1) {
            return ({
                MinimumEmploymentPeriod : 'The gap between End date and Start Date should for Employment is minimum 1 month'
            })
        }      
        
    }

    return null;
}