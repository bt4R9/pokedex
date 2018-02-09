export function animateZoom(node) {
    const rect = node.getBoundingClientRect();

    const wW = window.innerWidth;
    const wH = window.innerHeight;
    const elW = node.clientWidth;
    const elH = node.clientHeight;

    const shiftX = wW / 2 - elW / 2 - rect.x;
    const shiftY = wH / 2 - elH / 2 - rect.y;
    const scaleX = wW * 1.02 / elW;
    const scaleY = wH * 1.02 / elH;

    return {
        shiftX,
        shiftY,
        scaleX,
        scaleY
    };
}
