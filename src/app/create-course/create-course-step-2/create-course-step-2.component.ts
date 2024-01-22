import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CoursesService } from "../../services/courses.service";
import { createPromoRangeValidator } from "../../validators/date-range.validator";

@Component({
  selector: "create-course-step-2",
  templateUrl: "create-course-step-2.component.html",
  styleUrls: ["create-course-step-2.component.scss"],
})
export class CreateCourseStep2Component implements OnInit {
  form = this.fb.group(
    {
      courseType: ["premium", Validators.required],
      price: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(9999),
          Validators.pattern("[0-9]+"),
        ],
      ],
      promoStartAt: [null],
      promoEndAt: [null],
    },
    { validators: [createPromoRangeValidator()] }
  );

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService
  ) {}

  get priceControl() {
    return this.form.controls["price"];
  }

  ngOnInit() {
    this.form.valueChanges.subscribe((val) => {
      if (val.courseType == "free" && this.priceControl.enabled) {
        this.priceControl.disable({ emitEvent: false }); //avoid emit in value changes infante loop
        this.priceControl.reset();
      } else {
        this.priceControl.enable({ emitEvent: false });
      }
    });
  }
}
