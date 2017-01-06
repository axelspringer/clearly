/* tslint:disable no-input-rename */
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    Renderer,
    ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'ui-input',
    styleUrls: ['./input.scss'],
    templateUrl: './input.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputComponent),
        multi: true
    }]
})

export class InputComponent implements ControlValueAccessor {

    private _focused: boolean = false;
    private _value: any = '';


    get focused() { return this._focused; }

    @Input() id: string = null;
    @Input() maxlength: number = null;
    @Input() placeholder: string = null;

    private _autofocus: boolean = false;
    private _disabled: boolean = false;
    private _readonly: boolean = false;
    private _required: boolean = false;

    @Input()
    get autofocus(): boolean { return this._autofocus; }
    set autofocus(value) { this._autofocus = coerceBooleanProperty(value); }

    @Input()
    get disabled(): boolean { return this._disabled; }
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }

    @Input()
    get readonly(): boolean { return this._readonly; }
    set readonly(value) { this._readonly = coerceBooleanProperty(value); }

    @Input()
    get required(): boolean { return this._required; }
    set required(value) { this._required = coerceBooleanProperty(value); }

    private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @Output('blur')
    get onBlur(): Observable<FocusEvent> {
        return this._blurEmitter.asObservable();
    }

    @Output('focus')
    get onFocus(): Observable<FocusEvent> {
        return this._focusEmitter.asObservable();
    }

    constructor(private _el: ElementRef, private _renderer: Renderer) { }

    _handleFocus(event: FocusEvent) {
        this._focused = true;
        this._focusEmitter.emit(event);
        console.log("onFocus");
    }

    _handleBlur(event: FocusEvent) {
        this._focused = false;
        this.onTouchedCallback();
        this._blurEmitter.emit(event);
        console.log("onBlur");
    }

    _handleChange(event: Event) {
        this._value = (<HTMLInputElement>event.target).value;
        this.onTouchedCallback();
        console.log("onChange: " + this._value);
    }

    /** Set focus on input */
    focus() {
        this._renderer.invokeElementMethod(this._el.nativeElement, 'focus');
    }

    /*
     * These callbacks will be given to us through the ControlValueAccessor interface,
     * and we need to call them when the user interacts with the input.
     */
    private onChangeCallback = (_: any) => { };
    registerOnChange(onChange: any): void {
        this.onChangeCallback = onChange;
    }

    private onTouchedCallback = () => { };
    registerOnTouched(onTouched: any): void {
        this.onTouchedCallback = onTouched;
    }

    writeValue(value: any) {
        this._value = value;
    }

    get value(): any { return this._value; };
    @Input() set value(value: any) {
        if (value !== this._value) {
            this._value = value;
            this.onChangeCallback(value);
        }
    }
}

//TODO move to UTIL
function coerceBooleanProperty(value: any): boolean {
    return value != null && `${value}` !== 'false';
}