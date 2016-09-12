export function createImage(src: string) {
    let img:HTMLImageElement = new HTMLImageElement();
    img.src = src;
    return img;
}
