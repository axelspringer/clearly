/* tslint:disable: adjacent-overload-signatures */
export interface IDFormElementOptions<T> {
  channels: T[];
  channel: number | undefined;
  controlType?: string;
  disabled?: boolean;
  key?: string; // could be id
  label?: string;
  type?: string;
  order?: number;
  required?: boolean;
  validators?: T[];
  value?: any;
  subject?: string;
}

export class DFormElement<T> implements IDFormElementOptions<T> {

  public static id() {
    return Math.random().toString(36).substr(2, 10);
  };

  public channel: number | undefined;
  public channels: T[];
  public controlType: string;
  public disabled: boolean;
  public key: string;
  public label: string;
  public order: number;
  public required: boolean;
  public type: string;
  public validators: T[];
  public value: T;
  public subject: string;

  constructor(options: IDFormElementOptions<T> = {} as IDFormElementOptions<T>) {
    this.channel = options.channel;
    this.channels = options.channels || [];
    this.controlType = options.controlType || '';
    this.disabled = options.disabled || false;
    this.key = options.key || DFormElement.id();
    this.label = options.label || '';
    this.order = options.order === undefined ? 1 : options.order;
    this.required = !!options.required;
    this.validators = options.validators || [];
    this.value = options.value;
    // by default do not disable, could be enabled later
    this.subject = options.subject || 'Untitled';
  }

};
