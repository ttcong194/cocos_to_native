// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

export class Utils{
    public static CallNative(method: string, value: string = "No parameter"): string {
        if (!cc.sys.isNative || !cc.sys.isMobile) {
            cc.warn("Please use the Native function on your mobile device");
            return;
        }
 
        let result: string;
        switch (cc.sys.platform) {
            case cc.sys.ANDROID: {
                result = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "InfoFromJs", "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;", method, value);
                break;
            }
            case cc.sys.IPHONE:
            case cc.sys.IPAD: {
                result = jsb.reflection.callStaticMethod("AppController", "InfoFromJs:value:", method, value);
                break;
            }
            default: {
                cc.warn("Only supports iPhone, Adnroid, iPad devices");
                break;
            }
        }
        cc.log(`Js_To_Native========>method:${method};value:${value};result:${result}`);
        console.log(`Js_To_Native========>method:${method};value:${value};result:${result}`);
        return result;
    }
}

/*
Android
Them doan code tren vao class org.cocos2dx.javascript.AppActivity
public static String InfoFromJs(final String method, final String value){
        // Here be sure to use runOnUiThread
        app.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Builder builder = new AlertDialog.Builder(app);
                builder.setTitle("Alert!");
                builder.setMessage(value);
                builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                                app.runOnGLThread(new Runnable() {
                                    @Override
                                    public void run() {
                                        String js="cc.NativeCallBack.InfoToJs(\""+method+"\",\""+value+"\")";
        
                                        Cocos2dxJavascriptJavaBridge.evalString(js);
        
                                        Cocos2dxJavascriptJavaBridge.evalString("cc.error('12345')");
                                        Cocos2dxJavascriptJavaBridge.evalString("window.callAndroid.JavaCallBack('bbbbb')");
        
                                    }
                                });
                            }
                        });
                        AlertDialog alertDialog = builder.create();
                        alertDialog.show();
                    }
                });
                return "ok";
            }
*/

/*IOS
AppController.h

@class RootViewController;

@interface AppController : NSObject <UIApplicationDelegate>
{
}
+(NSString *)InfoFromJs:(NSString *) InfoFromJs value:(NSString *)value;
@property(nonatomic, readonly) RootViewController* viewController;

AppController.mm
@implementation AppController

Application* app = nullptr;
static RootViewController* rootViewController = nullptr;
@synthesize window;

- (BOOL)application:(UIApplication *)application{
// Use RootViewController to manage CCEAGLView
    _viewController = [[RootViewController alloc]init];
    rootViewController = _viewController;
}

+(NSString *)InfoFromJs:(NSString *) InfoFromJs value:(NSString *)value{
    UIAlertController* alert = [UIAlertController alertControllerWithTitle:@"Alert"
                                                                   message:value
                                                            preferredStyle:UIAlertControllerStyleAlert];

    UIAlertAction* defaultAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault
                                                          handler:^(UIAlertAction * action) {
                                                              //响应事件
                                                              NSString *execStr = [NSString stringWithFormat:@"window.callAndroid.JavaCallBack('bbbbb')"];
                                                              se::ScriptEngine::getInstance()->evalString([execStr UTF8String]);
                                                          }];

    [alert addAction:defaultAction];
    [rootViewController presentViewController:alert animated:NO completion:nil];
    return @"ok";
}

@end
*/

export class NativeCallBack {
    public static InfoToJs(method: string, value: string) {
        cc.log("InfoToJs:"+value);
        console.log("InfoToJs:"+value);
        switch (method) {
            default: {
                cc.warn("Unprocessed method" + method);
                return;
            }
        }
    }
 
 
}
cc["NativeCallBack"] = NativeCallBack;

export class CallAndroid
{
    onHandleFromNative = function(value:string){

    };
    private static _instance:CallAndroid = null;
    public static getInatance(){
        if(this._instance==null) this._instance = new CallAndroid();
        return this._instance;
    }
    public JavaCallBack(_str:string){
        cc.error("TS Callback:"+_str);
        if(this.onHandleFromNative != null){
            cc.error("TS Callback2:"+_str);
            this.onHandleFromNative(_str);
        }
    }
}
//the first method 
window["callAndroid"] = CallAndroid.getInatance();
 //The second method
// window.callAndroid = CallAndroid.getInatance();
// declare interface Window{
//     callAndroid:CallAndroid;
