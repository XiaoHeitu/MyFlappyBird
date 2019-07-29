import MainScript from "./MainScript";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class BGScript extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // @property(cc.Sprite)
    // bg:cc.Sprite=null;
    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        var main=cc.find("Canvas").getComponent(MainScript);
        if(main.IsGameOver)
        {
            return;
        }
        var offest=(dt/1)*40*main.speed;
        var widget=this.getComponent(cc.Widget);
        var oldLeft=widget.left;

        this.node.width=this.node.width + offest;
        widget.left=oldLeft-offest;
        
        widget.updateAlignment();
    }
}
