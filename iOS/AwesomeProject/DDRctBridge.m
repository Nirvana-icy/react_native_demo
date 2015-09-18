//
//  DDRctBridge.m
//  AwesomeProject
//
//  Created by JinglongBi on 15/9/18.
//  Copyright © 2015年 Facebook. All rights reserved.
//

#import "DDRctBridge.h"

@implementation DDRctBridge

RCT_EXPORT_MODULE();

+ (DDRctBridge *) instance {
  static dispatch_once_t onceToken;
  static DDRctBridge *service = nil;
  dispatch_once(&onceToken, ^{
    service = [[DDRctBridge alloc] init];
  });
  return service;
}

+ (id) allocWithZone:(NSZone *)zone
{ static DDRctBridge *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken,
                ^{ sharedInstance = [super allocWithZone:zone];
                });
  return sharedInstance;
}

/**
 *
 * 暴露Native方法给js
 *
 **/

RCT_EXPORT_METHOD(openUrl:(NSString *) url){
  dispatch_async(dispatch_get_main_queue(), ^{
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:url]];
  });
}

@end
