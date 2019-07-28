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
export default class PipesScript extends cc.Component {

    @property(cc.Prefab)
    downPipe: cc.Prefab = null;

    @property(cc.Prefab)
    upPipe: cc.Prefab = null;

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
        var offest=(dt/1)*60;
        var widget=this.getComponent(cc.Widget);
        var oldLeft=widget.left;
        
        this.node.width=this.node.width + offest;
        widget.left=oldLeft-offest;
        
        this.addNewPipe();

        widget.updateAlignment();
    }

    

    curMaxLeft=0;
    addNewPipe(){

        while(this.node.width > this.curMaxLeft)
        {
            
            if(this.node.childrenCount>0){
                this.curMaxLeft=this.node.children[this.node.childrenCount-1].getComponent(cc.Widget).left;
            }
            var pipe=cc.instantiate(this.downPipe);

            pipe.height=this.getRandomInt(100,400);
            var widget=pipe.getComponent(cc.Widget);
            widget.left=this.curMaxLeft+this.getRandomInt(100,300);

            var box=pipe.getComponent(cc.BoxCollider);        
            box.size.height=pipe.height;

            this.node.addChild(pipe);
            this.curMaxLeft=widget.left;
        }
    }

    getRandomInt(min:number,max:number):number{
        var r=Math.random();
        return Math.trunc( min+(r*(max+1-min)));
    }
}
