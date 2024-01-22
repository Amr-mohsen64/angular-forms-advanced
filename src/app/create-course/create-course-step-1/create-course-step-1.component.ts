import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { courseTitleValidator } from "../../validators/course-title.validator";
import { CoursesService } from "../../services/courses.service";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

interface CourseCategory {
  code: string;
  description: string;
}

@Component({
  selector: "create-course-step-1",
  templateUrl: "./create-course-step-1.component.html",
  styleUrls: ["./create-course-step-1.component.scss"],
})
export class CreateCourseStep1Component implements OnInit {
  categories$: Observable<CourseCategory[]> =
    this.coursesService.findCourseCategories();

  form = this.fb.group({
    title: [
      "",
      {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60),
        ],
        asyncValidators: [courseTitleValidator(this.coursesService)],
        // updateOn: "blur",
      },
    ],
    category: ["BEGINNER", [Validators.required]],
    releaseDate: [new Date(), [Validators.required]],
    downloadsAllowed: [false, [Validators.required]],
    longDescription: ["", [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService
  ) {}
  get courseTitle() {
    return this.form.controls["title"];
  }

  ngOnInit() {
    this.savDraft();
    this.getDraft();
  }

  savDraft() {
    this.form.valueChanges
      .pipe(filter(() => this.form.valid))
      .subscribe((formValue) => {
        localStorage.setItem("STEP_1", JSON.stringify(formValue));
      });
  }

  getDraft() {
    const draftFormData = localStorage.getItem("STEP_1");
    if (draftFormData) {
      this.form.patchValue(JSON.parse(draftFormData));
    }
  }
}
