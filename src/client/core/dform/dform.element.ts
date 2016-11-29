/* tslint:disable: adjacent-overload-signatures */
export interface IDFormElementOptions<T> {
  channels: T[];
  controlType?: string;
  disabled?: boolean;
  key?: string; // could be id
  label?: string;
  type?: string;
  order?: number;
  required?: boolean;
  validators?: T[];
  value?: T;
}

export class DFormElement<T> implements IDFormElementOptions<T> {

  private static __generateKey() {
    return Math.random().toString(36).substr(2, 10);
  };

  public value: T;
  public key: string;
  public label: string;
  public required: boolean;
  public order: number;
  public controlType: string;
  public disabled: boolean;
  public validators: T[];
  public channels: T[];
  public type: string;

  constructor(options: IDFormElementOptions<T> = {} as IDFormElementOptions<T>) {
    this.value = options.value;
    this.key = options.key || DFormElement.__generateKey();
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.channels = options.channels || [];
    this.controlType = options.controlType || '';
    this.disabled = options.disabled || false;
    this.validators = options.validators || [];
    // by default do not disable, could be enabled later
  }

};
