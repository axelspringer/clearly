export enum TOASTY_TYPE {
  INFO,
  WARN,
  ERROR,
};

export interface IToasty {
  message: string;
  type: TOASTY_TYPE;
};

// export type Toasty = IToasty;
export class Toasty implements IToasty {

  public message: string = null;
  public type: TOASTY_TYPE = null;

  constructor(message, type) {
    this.message = message || null;
    this.type = type || null;
  }

};
