import { Component } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "create-course-step-3",
  templateUrl: "create-course-step-3.component.html",
  styleUrls: ["create-course-step-3.component.scss"],
})
export class CreateCourseStep3Component {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    lessons: this.fb.array([this.createLessonForm()]),
  });

  get lessons() {
    return this.form.controls["lessons"] as FormArray;
  }

  onDeleteLesson(index: number) {
    if (this.lessons.length > 1) {
      this.lessons.removeAt(index);
    }
  }
  onAddLesson() {
    this.lessons.push(this.createLessonForm());
  }

  private createLessonForm() {
    return this.fb.group({
      title: ["", Validators.required],
      level: ["beginner", Validators.required],
    });
  }
}
