// #include <Cocoa/Cocoa.h>
#include <Foundation/Foundation.h>
#include <AppKit/AppKit.h>
#include <math.h>

#define CAML_NAME_SPACE

#include <caml/memory.h>
#include <caml/mlvalues.h>
#include <caml/callback.h>
#include <caml/custom.h>

// #include <string.h> // for memcpy
#include <caml/alloc.h>

#define NSString_val(v) [NSString stringWithUTF8String:String_val(v)]
#define Val_NSString(v) caml_copy_string([v UTF8String])

#define Wrap(res, v) \
  res = caml_alloc(1, Abstract_tag); \
  Store_field(res, 0, (long)v)
#define Unwrap(value) \
  (void*)Field(value, 0)

#define Unwrap_custom(value) \
  *((void **)Data_custom_val(value))


#define Double_pair(c, a, b) \
  float a = Double_val(Field(c, 0)); \
  float b = Double_val(Field(c, 1))

#define Create_double_pair(c, a, b) \
  c = caml_alloc_tuple(2); \
  Store_field(c, 0, caml_copy_double(a)); \
  Store_field(c, 1, caml_copy_double(b))

// #define DEBUG

#ifdef DEBUG
#define log(fmt) fprintf(stdout, fmt)
#define logf(fmt, ...) fprintf(stderr, fmt, __VA_ARGS__)
#else
#define log(fmt) (void)0
#define logf(fmt, ...) (void)0
#endif

#define Create_record4_double(r, a, b, c, d) \
  r = caml_alloc(4 * Double_wosize, Double_array_tag); \
  Store_double_field(r, 0, a); \
  Store_double_field(r, 1, b); \
  Store_double_field(r, 2, c); \
  Store_double_field(r, 3, d)

#define Unpack_record4_double(source, a, b, c, d) \
  float a = Double_field(source, 0); \
  float b = Double_field(source, 1); \
  float c = Double_field(source, 2); \
  float d = Double_field(source, 3)

#define Create_record2_double(r, a, b) \
  r = caml_alloc(2 * Double_wosize, Double_array_tag); \
  Store_double_field(r, 0, a); \
  Store_double_field(r, 1, b)

#define Unpack_record2_double(source, a, b) \
  float a = Double_field(source, 0); \
  float b = Double_field(source, 1)

// #define Unpack_record4_double(source, a, b, c, d) float a = Double_field(source, 0); float b = Double_field(source, 1); float c = Double_field(source, 2); float d = Double_field(source, 3)
#define Check_optional(source) (Is_block(source) && Tag_val(source) == 0)
#define Unpack_optional(source) Field(source, 0)

@interface FlippedView : NSView
- (BOOL)isFlipped;
@end

@interface FluidButton : NSButton
+ (FluidButton*)createWithTitle:(NSString*)title id:(int)id;
- (void)setId:(int)id;
@end

@interface ClickTarget : NSObject
- (instancetype)initWithOnClick:(int)onClick;
@end

void callUnit(int id);
void callString(int id, const char* text);
void callPos(int id, float x, float y);
void callRect(int id, float x, float y, float w, float h);