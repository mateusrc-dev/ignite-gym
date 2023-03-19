// we let's in this file create default errors message  treated by we

export class AppError {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
