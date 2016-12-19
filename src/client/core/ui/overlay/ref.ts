// importables
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

export class OverlayRef {

  // properties

  private _backdropClick: Subject<any> = new Subject();
  private _backdropElement: HTMLElement = null;

  // constructor

  constructor(
    private _container: HTMLElement,
  ) {}

  // public

  public get element(): HTMLElement {
    return this._container;
  }

  public attach(): void {
    document.body.appendChild(this._container);
  }

  public detach(): void {
    document.body.removeChild(this._container);
  }

  public get onBackDropClick(): Observable<Event> {
    return this._backdropClick;
  }

  public attachBackDrop() {
    this._backdropElement = document.createElement('div');
    this._backdropElement.classList.add('ui-overlay-backdrop');
    this._container.appendChild(this._backdropElement);

    this._backdropElement.addEventListener('click', (event: Event) => {
      this._backdropClick.next(event);
    });

    requestAnimationFrame(() => {
      if (this._backdropElement) {
        this._backdropElement.classList.add('ui-backdrop-is-showing');
      }
    });

  }

};
