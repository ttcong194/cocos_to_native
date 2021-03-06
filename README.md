# Cocos creator with Typescript to Java and Objective C

This is demo in cocos creator 2.4.2

- Call function java/objective C from typescript
- Call typescript function from native code (java/objective C)

**Android**

You need to add function InfoFromJs to class org.cocos2dx.javascript.AppActivity

```java
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
```

**IOS**

create file  AppController.h
```objectivec
@class RootViewController;

@interface AppController : NSObject <UIApplicationDelegate>
{
}
+(NSString *)InfoFromJs:(NSString *) InfoFromJs value:(NSString *)value;
@property(nonatomic, readonly) RootViewController* viewController;
```
implement AppController.mm
```objectivec
@implementation AppController

Application* app = nullptr;
static RootViewController* rootViewController = nullptr;
@synthesize window;

...

- (BOOL)application:(UIApplication *)application{
	...
// Use RootViewController to manage CCEAGLView
    _viewController = [[RootViewController alloc]init];
    rootViewController = _viewController;
    ...
}

+(NSString *)InfoFromJs:(NSString *) InfoFromJs value:(NSString *)value{
    UIAlertController* alert = [UIAlertController alertControllerWithTitle:@"Alert"
                                                                   message:value
                                                            preferredStyle:UIAlertControllerStyleAlert];

    UIAlertAction* defaultAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault
                                                          handler:^(UIAlertAction * action) {
                                                              
                                                              NSString *execStr = [NSString stringWithFormat:@"window.callAndroid.JavaCallBack('bbbbb')"];
                                                              se::ScriptEngine::getInstance()->evalString([execStr UTF8String]);
                                                          }];

    [alert addAction:defaultAction];
    [rootViewController presentViewController:alert animated:NO completion:nil];
    return @"ok";
}

@end
```

**References**
<br/>
-https://blog.liusiyu.cn/2017/07/02/cocos-creator
<br/>
-https://blog.csdn.net/u010571120/article/details/103958794
<br/>
-https://discuss.cocos2d-x.org/t/solved-cocos2dxjavascriptjavabridge/34391/5
<br/>
-https://www.programmersought.com/article/83374380347/
<br/>
-https://discuss.cocos2d-x.org/t/call-custom-js-code-from-java-with-cocos2dxjavascriptjavabridge/30837
<br/>
-https://xmanyou.com/cocos-creator-javascript-typescript-call-java-interface/
<br/>
-https://docs.cocos.com/creator/manual/en/advanced-topics/oc-reflection.html
<br/>
-https://github.com/cocos-creator/example-cases
