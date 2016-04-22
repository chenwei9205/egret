/**
 *
 * @author
 *
 */
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(lx, ly, r) {
        _super.call(this);
        this.shape = new egret.Shape;
        this.colorList = [13408665, 16777113, 6710937, 16750848, 16776960, 39372, 13421721, 13382553,
            10079232, 16737894, 16776960, 3381708, 13395456, 10066329, 13421619, 16750899, 16777164, 39219,
            39372, 13421772, 16737894, 16737792, 16777062, 39270, 13395507, 16764057, 13395456, 13369446, 39321, 16763955];
        this.init(lx, ly, r);
    }
    var d = __define,c=Circle,p=c.prototype;
    p.init = function (lx, ly, r) {
        var color = this.colorList[Math.round(Math.random() * this.colorList.length)];
        this.color = color;
        this.shape.graphics.beginFill(color, 0.8);
        this.shape.graphics.drawCircle(0, 0, r);
        this.shape.graphics.endFill();
        this.shape.x = -r;
        this.shape.y = -r;
        this.lx = lx;
        this.ly = ly;
        this.r = r;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.tap_fun, this, false);
        this.addChild(this.shape);
        this.x = lx;
        this.y = ly;
    };
    p.tap_fun = function (e) {
        var parent = this.parent;
        this.parent.dispatchEventWith("cricle_click", false, this.color);
        this.touchEnabled = false;
        var tween = egret.Tween.get(this);
        tween.to({ alpha: 0.1 }, 200, egret.Ease.sineIn);
        tween.call(function () {
            this.visible = false;
            this.parent.removeChild(this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.tap_fun, this, false);
        }, this);
        var cirList = [];
        var tweenList = [];
        var num = 3;
        var g = 0;
        for (var i = 0; i < num; i++) {
            for (var j = 0; j < num; j++) {
                cirList[g] = new Circle(this.lx - this.r / num * (2 * j), this.ly - this.r / num * (2 * i), this.r / num);
                cirList[g].alpha = 0.1;
                cirList[g].scaleX = 0.5;
                cirList[g].scaleY = 0.5;
                parent.addChild(cirList[g]);
                tweenList[g] = egret.Tween.get(cirList[g]);
                tweenList[g].to({ alpha: 0.8, scaleX: 1, scaleY: 1 }, 200, egret.Ease.sineOut);
                g++;
            }
        }
    };
    return Circle;
})(egret.Sprite);
egret.registerClass(Circle,'Circle');
