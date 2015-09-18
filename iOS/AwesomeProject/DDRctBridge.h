//
//  DDRctBridge.h
//  AwesomeProject
//
//  Created by JinglongBi on 15/9/18.
//  Copyright © 2015年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "RCTBridgeModule.h"

@interface DDRctBridge : NSObject<RCTBridgeModule>

+ (DDRctBridge *) instance;

@end
