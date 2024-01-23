import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from "@angular/forms";
import { noop, Subscription } from "rxjs";

@Component({
  selector: "address-form",
  templateUrl: "./address-form.component.html",
  styleUrls: ["./address-form.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AddressFormComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: AddressFormComponent,
    },
  ],
})
export class AddressFormComponent
  implements ControlValueAccessor, OnDestroy, Validator
{
  @Input()
  legend: string;

  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : { nestedFormInvalid: true };
  }

  form: FormGroup = this.fb.group({
    addressLine1: [null, [Validators.required]],
    addressLine2: [null, [Validators.required]],
    zipCode: [null, [Validators.required]],
    city: [null, [Validators.required]],
  });

  subscription: Subscription;
  onTouched: () => {};

  constructor(private fb: FormBuilder) {}

  //used by parent form to write a new value here
  writeValue(value: any): void {
    if (value) this.form.setValue(value, { emitEvent: false });
  }

  //whenever form value changes we want to report to parent that has changed
  registerOnChange(onChanged: any): void {
    this.subscription = this.form.valueChanges.subscribe((val) =>
      onChanged(val)
    );
  }

  //when we report that the form filed has been touched by the user
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(disabled: boolean): void {
    if (disabled) {
      console.log(disabled);
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
