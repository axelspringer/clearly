export function isElementInViewport(el): boolean {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export function isRightOffset(el): boolean {
  return calcRightOffset(el) < 0;
};

export function isLeftOffset(el): boolean {
  return !isRightOffset(el);
}

export function calcRightOffset(el): number {
  return el.getBoundingClientRect().right -
    (window.innerWidth || document.documentElement.clientWidth);
};

export function calcLeftOffset(el): number {
  return el.getBoundingClientRect().left;
};

export function toPx(pxs: number): string {
  return `${pxs}px`;
};
