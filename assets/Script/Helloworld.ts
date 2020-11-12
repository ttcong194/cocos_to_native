import {Utils,CallAndroid} from "./Utils"
const {ccclass, property} = cc._decorator;
//reference here
//https://blog.liusiyu.cn/2017/07/02/cocos-creator%E7%9A%84java%E4%B8%8Ets%E4%BA%92%E7%9B%B8%E8%B0%83%E7%94%A8/
//https://blog.csdn.net/u010571120/article/details/103958794
//https://discuss.cocos2d-x.org/t/solved-cocos2dxjavascriptjavabridge/34391/5
//https://www.programmersought.com/article/83374380347/
//https://discuss.cocos2d-x.org/t/call-custom-js-code-from-java-with-cocos2dxjavascriptjavabridge/30837
//https://xmanyou.com/cocos-creator-javascript-typescript-call-java-interface/
//https://docs.cocos.com/creator/manual/en/advanced-topics/oc-reflection.html

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    btnOnClick(){
        console.log("btnOnClick");
        //window["callAndroid"].JavaCallBack('bbbbb');
        Utils.CallNative("1","Hello guys, I call you from typescript");
    }

    start () {
        // init logic
        this.label.string = this.text;
        CallAndroid.getInatance().onHandleFromNative = this.setText.bind(this);
        this.node.on(cc.Node.EventType.SIZE_CHANGED,this.changeSize.bind(this), this);
    }
    changeSize(event){
        console.log("SIZE_CHANGED");
        console.log("event",cc.winSize.height);
        console.log("event",cc.winSize.width);
        
        let h = cc.view.getFrameSize().height;
        let w = cc.view.getFrameSize().width;
        console.log("h",h);
        console.log("w",w);
        
        let canvas :cc.Canvas = this.node.getComponent(cc.Canvas);
        if(canvas!= null){
            if(h > w){
                console.log("1");
                cc.view.setDesignResolutionSize(w,h,cc.ResolutionPolicy.FIXED_WIDTH);
                /*canvas.designResolution = new cc.Size(640,1240.8888888888889);
                canvas.fitWidth = false;
                canvas.fitHeight = false;*/
                
            }
            else{
                console.log("2");
                cc.view.setDesignResolutionSize(w,h,cc.ResolutionPolicy.FIXED_WIDTH);
                /*canvas.designResolution = new cc.Size(1240.8888888888889,640);
                canvas.fitWidth = false;
                canvas.fitHeight = false;*/
                
            }
        }
    }
    setText(value:string){
        cc.log("onHandleFromNative inside");
        cc.log("onHandleFromNative inside"+value);
        this.label.string = value;
    }
}
