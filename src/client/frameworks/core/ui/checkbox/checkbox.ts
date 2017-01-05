/* tslint:disable no-input-rename */
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'ui-checkbox',
    styleUrls: ['./checkbox.scss'],
    templateUrl: './checkbox.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxComponent),
        multi: true
    }]
})

export class CheckboxComponent implements ControlValueAccessor {

    @Input() id: string = null;
    @Input() private _checked = false;
    public get checked() {
        return this._checked;
    }
    public set checked(value: boolean) {
        if (value !== this._checked) {
            this._checked = value;
        }
    }
    @Output() public change = new EventEmitter<boolean>(false);

    public toggle() {
        this.checked = !this.checked;
        this.onChangeCallback(this.checked);
        this.change.emit(this.checked);
        console.log("toggle" + this._checked);
    }

    writeValue(value: any): void {
        this.checked = !!value;
    }

    /*
     * These callbacks will be given to us through the ControlValueAccessor interface,
     * and we need to call them when the user interacts with the checkbox.
     */
    private onChangeCallback = (_: any) => { };
    registerOnChange(onChange: any): void {
        this.onChangeCallback = onChange;
    }

    private onTouchedCallback = () => { };
    registerOnTouched(onTouched: any): void {
        this.onTouchedCallback = onTouched;
    }

    public touch() {
        this.onTouchedCallback();
    }
}