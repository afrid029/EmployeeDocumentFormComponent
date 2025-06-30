import { AbstractControl, ValidationErrors } from "@angular/forms";

export function MinimumEmploymentPeriod(control : AbstractControl) : ValidationErrors | null {
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

        inputEndDate.setHours(0,0,0,0);
        inputStartDate.setHours(0,0,0,0);
        const diffInMs = inputEndDate.getTime() - inputStartDate.getTime()

        const diffInMonths = diffInMs / (1000 * 60 * 60 * 24 * 30)
        if(diffInMs > 0 && diffInMonths < 1) {
            return ({
                MinimumEmploymentPeriod : 'The gap between End date and Start Date for Employment should be minimum 1 month'
            })
        }      
        
    }

    return null;
}