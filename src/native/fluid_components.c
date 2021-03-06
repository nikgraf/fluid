#include "./fluid_shared.h"

// MARK - View operations

void fluid_NSView_clearChildren(value view_v) {
  CAMLparam1(view_v);
  NSView* view = (NSView*) Unwrap(view_v);
  while (view.subviews.lastObject != nil) {
    NSView* child = view.subviews.lastObject;
    [child removeFromSuperview];
    [child release];
  }
  CAMLreturn0;
}

void fluid_NSView_appendChild(value view_v, value child_v) {
  CAMLparam2(view_v, child_v);
  log("Append child view\n");
  NSView* view = (NSView*) Unwrap(view_v);
  NSView* child = (NSView*) Unwrap(child_v);
  // NSLog(@"- view %@\n", view);
  // NSLog(@"- child %@\n", child);
  [child retain];

  if ([view isKindOfClass:[NSScrollView class]]) {
    NSView* prev = ((NSScrollView*)view).documentView;
    NSScrollView* scroll = (NSScrollView*)view;
    [scroll setDocumentView:child];
    if (prev != nil) {
      [prev release];
    }
    CAMLreturn0;
  }

  NSView* last = view.subviews.lastObject;
  if (last != nil) {
    log("- add after\n");
    [view addSubview:child positioned:NSWindowBelow relativeTo:last];
  } else {
    log("- add last\n");
    [view addSubview:child];
  }
  log("Finished appending\n");

  CAMLreturn0;
}

void fluid_NSView_removeChild(value view_v, value child_v) {
  CAMLparam2(view_v, child_v);
  log("Remove child view\n");
  NSView* view = (NSView*) Unwrap(view_v);
  NSView* child = (NSView*) Unwrap(child_v);

  if ([view isKindOfClass:[NSScrollView class]]) {
    view = ((NSScrollView*)view).documentView;
  }

  if (child.superview == view) {
    [child removeFromSuperview];
    [child release];
  }

  CAMLreturn0;
}

void fluid_NSView_replaceWith(value view_v, value replace_v) {
  CAMLparam2(view_v, replace_v);
  log("Replace view\n");
  NSView* view = (NSView*) Unwrap(view_v);
  NSView* replace = (NSView*) Unwrap(replace_v);

  if (view.superview != nil) {
    [view.superview replaceSubview:view with:replace];
    [view release];
  }
  [replace retain];

  CAMLreturn0;
}

void fluid_setImmediate(value callback) {
  CAMLparam1(callback);
  // log("Set immediate\n");
  // dispatch_after(DISPATCH_TIME_NOW, dispatch_get_main_queue(), ^(void){
    caml_callback(callback, Val_unit);
  // });
  CAMLreturn0;
}

// MARK - location updates

void fluid_update_NSView_loc(value view_v, value dims_v) {
  CAMLparam2(view_v, dims_v);

  NSView* view = (NSView*) Unwrap(view_v);
  Unpack_record4_double(dims_v, left, top, width, height);

  if (left != view.frame.origin.x || top != view.frame.origin.y) {
    [view setFrameOrigin:NSMakePoint(left, top)];
  }
  if (width != view.frame.size.width || height != view.frame.size.height) {
    [view setFrameSize:NSMakeSize(width, height)];
  }

  CAMLreturn0;
}

void fluid_update_Text_loc(value view_v, value dims_v) {
  CAMLparam2(view_v, dims_v);

  NSTextField* text = (NSTextField*) Unwrap(view_v);
  Unpack_record4_double(dims_v, left, top, width, height);

  [text setFrameOrigin:NSMakePoint(left, top + 5.0)];
  [text setFrameSize:NSMakeSize(width, height)];

  CAMLreturn0;
}

void fluid_update_NSButton_loc(value view_v, value dims_v) {
  CAMLparam2(view_v, dims_v);

  FluidButton* view = (FluidButton*) Unwrap(view_v);
  Unpack_record4_double(dims_v, left, top, width, height);

  [view setFrameOrigin:NSMakePoint(left, top)];
  // [view setFrameSize:NSMakeSize(width, height)];

  CAMLreturn0;
}

// MARK - Image View

// image_custom_ops



void finalize_image( value v )
{

    NSImage* my_image;
    my_image = (NSImage*) Unwrap_custom(v);
    [my_image release];
    log("Freed image\n");
}

static struct custom_operations image_custom_ops = {
    .identifier= "fluid.NSImage",
    .finalize=    finalize_image,
    .compare=     custom_compare_default,
    .hash=        custom_hash_default,
    .serialize=   custom_serialize_default,
    .deserialize= custom_deserialize_default
};

CAMLprim value wrap_image(NSImage* image) {
  CAMLparam0();
  CAMLlocal1(image_v);
  NSSize size = [image size];
  logf("Allocated image %f\n", size.width * size.height);
  image_v = caml_alloc_custom(&image_custom_ops, sizeof(NSImage *), size.width * size.height, 5 * 1000 * 1000);
  Unwrap_custom(image_v) = image;
  CAMLreturn(image_v);
}

void fluid_Image_load(value src_v, value onDone_v) {
  CAMLparam2(src_v, onDone_v);
  // caml_register_global_root(&onDone_v);

  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    // Your Background work
    NSImage* image;
    NSString* src = NSString_val(src_v);
    if ([src hasPrefix:@"http"]) {
      image = [[NSImage alloc] initWithContentsOfURL:[NSURL URLWithString:src]];
    } else {
      image = [[NSImage alloc] initWithContentsOfFile:src];
    }

    dispatch_async(dispatch_get_main_queue(), ^{
      caml_callback(onDone_v, wrap_image(image));
      // caml_remove_global_root(&onDone_v);
    });
  });

  CAMLreturn0;
}

CAMLprim value fluid_create_NSImageView(value src_v, value dims_v) {
  CAMLparam2(src_v, dims_v);

  Unpack_record4_double(dims_v, left, top, width, height);

  NSRect frame = NSMakeRect(left, top, width, height);

  NSView* view = [[FlippedView alloc] initWithFrame:frame];
  NSImage* image;
  if (Tag_val(src_v) == 0) {
    image = (NSImage*)Unwrap_custom(Field(src_v, 0));
  } else {
    NSString* src = NSString_val(Field(src_v, 0));
    if ([src hasPrefix:@"http://"] || [src hasPrefix:@"https://"]) {
      image = [[NSImage alloc] initWithContentsOfURL:[NSURL URLWithString:src]];
    } else {
      image = [[NSImage alloc] initWithContentsOfFile:src];
    }
  }
  view.wantsLayer = true;
  if (image != nil) {
    // [image retain];
    // id currentContents = view.layer.contents;
    // if (currentContents != nil) {
    //   [currentContents release];
    // }
    // if (currentContents != nil && [currentContents isKindOfClass:[NSImage class]]) {
    //   [currentContents release];
    // }
    [view.layer setContents:image];
  } else {
    view.layer.backgroundColor = CGColorCreateGenericRGB(1.0, 0, 0, 1.0);
  }

  CAMLlocal1(view_v);
  Wrap(view_v, view);
  CAMLreturn(view_v);
}

// MARK - Plain View

CAMLprim value fluid_create_ScrollView(value dims_v) {
  CAMLparam1(dims_v);
  CAMLlocal1(view_v);
  log("Create scroll view\n");

  Unpack_record4_double(dims_v, left, top, width, height);

  NSRect frame = NSMakeRect(left, top, width, height);
  NSScrollView* view = [[NSScrollView alloc] initWithFrame:frame];

  [view setHasVerticalScroller:YES];
  [view setHasHorizontalScroller:NO];
  [view setAutoresizingMask:NSViewWidthSizable |
              NSViewHeightSizable];

  Wrap(view_v, view);
  CAMLreturn(view_v);
}

// MARK - Custom view


CAMLprim value fluid_create_NSView(value id, value pos_v, value size_v, value style_v) {
  CAMLparam4(id, pos_v, size_v, style_v);
  CAMLlocal1(view_v);
  log("Create view\n");

  Double_pair(pos_v, top, left);
  Double_pair(size_v, width, height);
  NSRect frame;
  frame = NSMakeRect(left, top, width, height);

  NSView* view = [[FlippedView alloc] initWithFrame:frame];

  value backgroundColor = Field(style_v, 0);
  if (Check_optional(backgroundColor)) {
    value color = Unpack_optional(backgroundColor);
    Unpack_record4_double(color, r, g, b, a);
    view.wantsLayer = true;
    view.layer.backgroundColor = CGColorCreateGenericRGB(r, g, b, a);
  }

  Wrap(view_v, view);
  CAMLreturn(view_v);
}

void fluid_update_NSView(value view_v, value id, value style_v) {
  CAMLparam3(view_v, id, style_v);

  log("Update view\n");
  NSView* view = (NSView*)Unwrap(view_v);

  value backgroundColor = Field(style_v, 0);
  if (Is_block(backgroundColor) && Tag_val(backgroundColor) == 0) {
    value color = Field(backgroundColor, 0);
    Unpack_record4_double(color, r, g, b, a);
    view.wantsLayer = true;
    view.layer.backgroundColor = CGColorCreateGenericRGB(r, g, b, a);
  } else {
    view.wantsLayer = false;
  }

  CAMLreturn0;
}


// MARK - Text

CAMLprim value fluid_measureText(value text_v, value font_v, value fontSize_v, value maxWidth_v) {
  CAMLparam4(text_v, font_v, fontSize_v, maxWidth_v);
  CAMLlocal1(result);
  log("Measure text\n");

  NSSize textSize;

  NSString *textContent = NSString_val(text_v);
  NSString *font = NSString_val(font_v);
  double fontSize = Double_val(fontSize_v);

  NSFont *nsFont = [NSFont fontWithName:font size:fontSize];
  if (nsFont == nil) {
    result = caml_alloc_tuple(2);
    printf("Invalid font %s\n", String_val (font_v));
    Store_field (result, 0, caml_copy_double(0.f));
    Store_field (result, 1, caml_copy_double(0.f));

    CAMLreturn(result);
  }

  if (Is_block(maxWidth_v)) {
    float maxWidth = Double_val(Field(maxWidth_v, 0));

    NSTextStorage *textStorage = [[[NSTextStorage alloc]
          initWithString:textContent] autorelease];
    NSTextContainer *textContainer = [[[NSTextContainer alloc]
          initWithContainerSize: NSMakeSize(maxWidth, FLT_MAX)] autorelease];
    NSLayoutManager *layoutManager = [[[NSLayoutManager alloc] init]
          autorelease];
    [layoutManager addTextContainer:textContainer];
    [textStorage addLayoutManager:layoutManager];
    [textStorage addAttribute:NSFontAttributeName value:nsFont
          range:NSMakeRange(0, [textStorage length])];
    [textContainer setLineFragmentPadding:2.0];
    (void) [layoutManager glyphRangeForTextContainer:textContainer];
    textSize = [layoutManager usedRectForTextContainer:textContainer].size;
  } else {
    NSDictionary *attributes = [NSDictionary dictionaryWithObjectsAndKeys:nsFont, NSFontAttributeName, nil];
    NSAttributedString *text = [[NSAttributedString alloc] initWithString:textContent attributes: attributes];
    textSize = [text size];
  }

  Create_double_pair(result, textSize.width + 5.0, textSize.height + 5.0);

  CAMLreturn(result);
}




@interface TextFieldDelegate : NSObject <NSTextFieldDelegate>
@property (nonatomic) int onChange;
@property (nonatomic) int onEnter;
@property (nonatomic) int onTab;
@property (nonatomic) int onShiftTab;
@property (nonatomic) int onEscape;
@end

@implementation TextFieldDelegate {
}

- (BOOL)control:(NSControl* )control textView:(NSTextView *)textView doCommandBySelector:(SEL)commandSelector {
  // printf("2 Doing a command I guess %s\n", [NSStringFromSelector(commandSelector) UTF8String]);
  if (commandSelector == @selector(cancel:)) {
    if (self.onEscape != -1) {
      callUnit(self.onEscape);
      return YES;
    } else {
      return NO;
    }
  }
  if (commandSelector == @selector(insertNewline:)) {
    if (self.onEnter != -1) {
      callUnit(self.onEnter);
      return YES;
    } else {
      return NO;
    }
  } else if (commandSelector == @selector(insertTab:)) {
    if (self.onTab != -1) {
      callUnit(self.onTab);
      return YES;
    } else {
      return NO;
    }
  } else if (commandSelector == @selector(insertBacktab:)) {
    if (self.onShiftTab != -1) {
      callUnit(self.onShiftTab);
      return YES;
    } else {
      return NO;
    }
  }
  return NO;
}

- (void)controlTextDidChange:(NSNotification *) notification {
  CAMLparam0();
  log("Text change\n");

  if (self.onChange != -1) {
    id textField = [notification object];
    log("Calling\n");

    callString(self.onChange, [[textField stringValue] UTF8String]);
  }

  CAMLreturn0;
}
@end

void set_handlers(TextFieldDelegate* delegate, value handlers) {
  CAMLparam1(handlers);

  delegate.onEnter = Check_optional(Field(handlers, 0)) ? Int_val(Unpack_optional(Field(handlers, 0))) : -1;
  delegate.onTab = Check_optional(Field(handlers, 1)) ? Int_val(Unpack_optional(Field(handlers, 1))) : -1;
  delegate.onShiftTab = Check_optional(Field(handlers, 2)) ? Int_val(Unpack_optional(Field(handlers, 2))) : -1;
  delegate.onChange = Check_optional(Field(handlers, 3)) ? Int_val(Unpack_optional(Field(handlers, 3))) : -1;
  delegate.onEscape = Check_optional(Field(handlers, 4)) ? Int_val(Unpack_optional(Field(handlers, 4))) : -1;

  CAMLreturn0;
}

CAMLprim value fluid_create_NSTextView(value contents_v, value dims_v, value font_v, value selectable, value handlers) {
  CAMLparam4(contents_v, dims_v, font_v, handlers);
  CAMLlocal1(text_v);
  // caml_register_global_root(&onChange_v);
  log("Create text view\n");

  NSString *contents = NSString_val(contents_v);
  NSTextField* text;

  NSString *fontName = NSString_val(Field(font_v, 0));
  double fontSize = Double_val(Field(font_v, 1));

  NSFont *nsFont = [NSFont fontWithName:fontName size:fontSize];
  if (nsFont != nil) {
    NSMutableAttributedString *attrstr = [[NSMutableAttributedString alloc] initWithString:contents];
    NSDictionary *attributes = @{ NSFontAttributeName : nsFont };
    [attrstr setAttributes:attributes range:NSMakeRange(0, contents.length)];
    text = [NSTextField labelWithAttributedString:attrstr];
  } else {
    text = [NSTextField labelWithString:contents];
  }

  text.selectable = selectable == Val_true;

  if (Check_optional(Field(handlers, 3))) {
    text.editable = true;
    text.wantsLayer = true;
    text.layer.backgroundColor = CGColorCreateGenericRGB(1, 1, 1, 1);
  }
  // text.wantsLayer = true;
  // text.layer.backgroundColor = CGColorCreateGenericRGB(0, 1, 0, 1);
  TextFieldDelegate* delegate = [[TextFieldDelegate alloc] init];
  text.delegate = delegate;
  set_handlers(delegate, handlers);

  Unpack_record4_double(dims_v, left, top, width, height);

  [text setFrameOrigin:NSMakePoint(left, top + 5.0)];
  [text setFrameSize:NSMakeSize(width, height)];

  Wrap(text_v, text);

  CAMLreturn(text_v);
}

void fluid_set_NSTextView_textContent(value text_v, value contents_v, value dims, value font_v, value handlers_v) {
  CAMLparam5(text_v, contents_v, dims, font_v, handlers_v);
  // caml_register_global_root(&onChange_v);
  // log("Update text view\n");
  log("Update text view\n");

  NSTextField* text = (NSTextField*)Unwrap(text_v);
  NSString *contents = NSString_val(contents_v);

  NSString *fontName = NSString_val(Field(font_v, 0));
  double fontSize = Double_val(Field(font_v, 1));

  NSFont *nsFont = [NSFont fontWithName:fontName size:fontSize];
  if (nsFont != nil) {
    NSMutableAttributedString *attrstr = [[NSMutableAttributedString alloc] initWithString:contents];
    NSDictionary *attributes = @{ NSFontAttributeName : nsFont };
    [attrstr setAttributes:attributes range:NSMakeRange(0, contents.length)];
    text.attributedStringValue = attrstr;
  } else {
    text.stringValue = contents;
  }

  text.editable = Check_optional(Field(handlers_v, 3));
  TextFieldDelegate* delegate = (TextFieldDelegate*)text.delegate;
  set_handlers(delegate, handlers_v);

  Unpack_record4_double(dims, left, top, width, height);

  [text setFrameOrigin:NSMakePoint(left, top + 5.0)];
  [text setFrameSize:NSMakeSize(width, height)];

  CAMLreturn0;
}

// MARK - Button


void fluid_update_NSButton(value button_v, value title_v) {
  CAMLparam2(button_v, title_v);
  log("Update button\n");

  FluidButton* button = (FluidButton*)Unwrap(button_v);
  NSString *title = NSString_val(title_v);

  button.title = title;

  // float top = Double_val(Field(pos_v, 0));
  // float left = Double_val(Field(pos_v, 1));

  // [button setFrameOrigin:NSMakePoint(left, top)];
  // [button setFrameSize:NSMakeSize(width, height)];

  CAMLreturn0;
}

CAMLprim value fluid_create_NSButton(value title_v, value id, value pos_v, value size_v) {
  CAMLparam4(title_v, id, pos_v, size_v);
  CAMLlocal1(button_v);
  log("Create button\n");

  NSString *title = NSString_val(title_v);

  FluidButton* button = [FluidButton createWithTitle:title id:Int_val(id)];

  Double_pair(pos_v, top, left);
  // Double_pair(size_v, width, height);

  [button setFrameOrigin:NSMakePoint(left, top)];

  Wrap(button_v, button);
  CAMLreturn(button_v);
}

// MARK - Null node

CAMLprim value fluid_create_NullNode() {
  CAMLparam0();
  CAMLlocal1(view_v);
  NSView* view = [[FlippedView alloc] initWithFrame:CGRectZero];
  Wrap(view_v, view);
  CAMLreturn(view_v);
}
