export class OverlayContainer {

  // properties
  private _el: HTMLElement;

  // public

  public get element(): HTMLElement {
    if (!this._el) {
      this._createElement();
    }
    return this._el;
  }

  // private

  private _createElement(): void {
    const el = document.createElement('div');
    el.classList.add('ui-overlay-container');
    // move to ref
    // document.body.appendChild(el);
    this._el = el;
  }

}
