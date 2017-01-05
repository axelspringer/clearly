/* tslint:disable no-input-rename */
import { InputComponent } from '../input/input';
import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    Input,
    ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'ui-textarea',
    styleUrls: ['./textArea.scss'],
    templateUrl: './textArea.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputComponent),
        multi: true
    }]
})

export class TextAreaComponent extends InputComponent {

    // textarea-specific
    @Input() rows: number = null;
    @Input() cols: number = null;
    @Input() wrap: 'soft' | 'hard' = null;

}