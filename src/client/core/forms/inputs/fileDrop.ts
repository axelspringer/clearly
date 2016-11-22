// Importables
import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { AfterContentInit } from '@angular/core';
import { Renderer } from '@angular/core';

@Directive({
  selector: '[sg-file-droppable]',
})
export class SgFileDroppableDirective implements AfterContentInit {

  public files: any[] = [];
  public input: any;

  @Input('filter')
  set filter(shouldFilter: boolean) {
    this._options.filter = shouldFilter;
  }

  @Output() onFileUpload: EventEmitter<any> = new EventEmitter();
  @Output() onFileDragOver: EventEmitter<any> = new EventEmitter();
  @Output() onFileUploadFailed: EventEmitter<any> = new EventEmitter();

  @Input('options')
  set options(newOptions: any) {
    this._options = Object.assign(this._defaults, newOptions);
  }

  @HostListener('click')
  public onClick() { // click on pseudo element
    this.input.value = null;
    this.input.click();
  };

  @HostListener('dragenter')
  public onDragEnter() {
    event.preventDefault();
  };

  @HostListener('dragover')
  public onDragOver() {
    event.preventDefault();
    this.setOnDragClass(true);
    this.onFileDragOver.emit(true);
  }

  @HostListener('dragleave')
  public onDragLeave() {

    this.onFileDragOver.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.setOnDragClass(false);
    this.uploadFiles(event['dataTransfer'].files);

  }

  private _options: any = {}; // needs a type
  private _defaults: any = {
    filter: true,
    fileExtensions: [
      'image/png',
      'image/jpg'
    ],
    classNames: {
      onDragDrop: 'sg-file-droppable-drag-drop',
    },
  };

  constructor(
    public elRef: ElementRef,
    private _renderer: Renderer,
  ) {
    this._options = this._defaults;
  }

  public ngAfterContentInit() {
    this._renderer.createElement(this.elRef.nativeElement, 'input');
    this.input = this.elRef.nativeElement.querySelector('input');
    this._renderer.setElementAttribute(this.input, 'type', 'file');
    this._renderer.setElementAttribute(this.input, 'multiple', 'false');
    this._renderer.setElementStyle(this.input, 'display', 'none');

    this._renderer.listen(this.input, 'change', event => {
      event.preventDefault();
      this.uploadFiles(event.target.files);
    });

  }

  private filterDroppedFilesByExtension(files: any[]) {
    return files.filter(file => this._options.fileExtensions.indexOf(file.type) !== -1);
  }

  private uploadFiles(files: any[]) {
    files = Array.from(files);

    if (this._options.filter) {
      files = this.filterDroppedFilesByExtension(files);
    }

    if (files.length === 1) {
      this.onFileUpload.emit(true);
      setTimeout(() => {
        this.onFileUpload.emit(false);
      }, 5000);
    }
  }

  private setOnDragClass(isAdd: boolean) {
    this._renderer.setElementClass(this.elRef.nativeElement, this._defaults.classNames['onDragDrop'], isAdd);
  }

}
