// #include <Cocoa/Cocoa.h>
#include <Foundation/Foundation.h>
#include <AppKit/AppKit.h>
#include <math.h>

#define CAML_NAME_SPACE

#include <caml/memory.h>
#include <caml/mlvalues.h>
#include <caml/callback.h>

// #include <string.h> // for memcpy
#include <caml/alloc.h>

#define NSString_val(v) [NSString stringWithUTF8String:String_val(v)]
#define Double_pair(c, a, b) float a = Double_val(Field(c, 0)); float b = Double_val(Field(c, 1))
#define Create_double_pair(c, a, b) c = caml_alloc_tuple(2); Store_field(c, 0, caml_copy_double(a)); Store_field(c, 1, caml_copy_double(b))

@interface FlippedView : NSView
- (BOOL)isFlipped;
@end

@interface MLButtonDelegate : NSObject
- (instancetype)initWithOnPress:(value)onPressv;
@end