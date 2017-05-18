export function blur(element, src, strength){
    var image = new Image();
    image.src = src;
    image.onload = function(e){
        var canvas = element
        var context = canvas.getContext('2d');

        canvas.width = this.width;
        canvas.height = this.height;

        context.drawImage(this, 0, 0);

        context.globalAlpha = .5;

        for (var y = -strength; y <= strength; y += 2) {
            for (var x = -strength; x <= strength; x += 2) {
                context.drawImage(canvas, x, y);
            }
        }
        context.globalAlpha = 1;
    }
}
