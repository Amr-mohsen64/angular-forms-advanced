import { FormGroup, ValidatorFn, Validators } from "@angular/forms";
//validator at the level of the form
export function createPromoRangeValidator(): ValidatorFn {
  return (form: FormGroup): Validators | null => {
    const start: Date = form.get("promoStartAt").value;
    const end: Date = form.get("promoEndAt").value;

    const isRangeValid = end?.getTime() - start?.getTime() > 0;

    return isRangeValid ? null : { promoPeriod: true };
  };
}
