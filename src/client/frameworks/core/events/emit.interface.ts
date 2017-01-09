// Abstracts, classes, interfaces ...
export abstract class CoreEvent {
  constructor(
    public payload?,
  ) { }

  public toString() {
    return this.payload;
  }
};
