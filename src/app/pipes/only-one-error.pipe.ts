import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "onlyOneError",
})
export class OnlyOneErrorPipe implements PipeTransform {
  transform(allErrors: object, errorsPriority: string[]): object {
    // when no errors passed to the pipe
    if (!allErrors) return null;

    const onlyOneError: object = {};

    for (const error of errorsPriority) {
      // if the angular errors contains the error passed in loop then add this error to onlyOneError and stop the loop
      if (allErrors[error]) {
        onlyOneError[error] = allErrors[error];
        break;
      }
    }
    return onlyOneError;
  }
}
