// Imports from @angular
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Input, Output, Component, forwardRef } from '@angular/core';
import { EventEmitter, HostListener } from '@angular/core';
// Directives
import { MdlDirective } from '../../directives/mdl.directive'

export const MDL_SELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdlSelectComponent),
  multi: true
};

@Component({
  selector: 'mdlSelect, mdl-select',
  template: `
    <div class="mdl-selectfield mdl-js-selectfield" [ngClass]="class" mdl>
      <select class="mdl-selectfield__select"
        [value]="value" #select [id]="id" [disabled]="disabled"
        (blur)="onTouched()"
        (change)="changes.emit(select.value)">
        <ng-content></ng-content>
      </select>
      <label class="mdl-selectfield__label" [attr.for]="id">{{label}}</label>
      <!-- <span class="mdl-selectfield__error">Select aw value</span> -->
    </div>
  `,
  directives: [
    MdlDirective
  ],
  providers: [
    MDL_SELECT_VALUE_ACCESSOR
  ]
})
export class MdlSelectComponent implements ControlValueAccessor {
  @Input() id: string;
  @Input() value: string;
  @Input() label: string;
  @Input() class: string;
  @Input() disabled: boolean = false;
  @Output() changes = new EventEmitter();

  // Needed to properly implement ControlValueAccessor.
  @HostListener('changes', ['$event'])
  onChange = (_) => { console.log(); };
  @HostListener('blur', ['$event'])
  onTouched = () => { console.log(); };
  writeValue(value: any): void { this.value = value; }
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
