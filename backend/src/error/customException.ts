
export class CustomException extends Error {
    private readonly errorCode: number;
  
    constructor(message: string, errorCode: number) {
      super(message);
      this.errorCode = errorCode;
    }
  
    getErrorCode(): number {
      return this.errorCode;
    }
  }
  