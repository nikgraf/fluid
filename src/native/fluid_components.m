#include "./fluid_shared.h"

// View

void fluid_NSView_appendChild(value view_v, value child_v) {
  CAMLparam2(view_v, child_v);
  NSView* view = (NSView*) view_v;
  NSView* child = (NSView*) child_v;

  NSView* last = view.subviews.lastObject;
  if (last != nil) {
    [view addSubview:child positioned:NSWindowBelow relativeTo:last];
  } else {
    [view addSubview:child];
  }

  CAMLreturn0;
}

void fluid_NSView_removeChild(value view_v, value child_v) {
  CAMLparam2(view_v, child_v);
  NSView* view = (NSView*) view;
  NSView* child = (NSView*) child;

  if (child.superview == view) {
    [child removeFromSuperview];
  }

  CAMLreturn0;
}

void fluid_NSView_replaceWith(value view_v, value replace_v) {
  CAMLparam2(view_v, replace_v);
  NSView* view = (NSView*) view_v;
  NSView* replace = (NSView*) replace_v;

  if (view.superview != nil) {
    [view.superview replaceSubview:view with:replace];
  }

  CAMLreturn0;
}

void fluid_setImmediate(value callback) {
  CAMLparam1(callback);
  dispatch_after(DISPATCH_TIME_NOW, dispatch_get_main_queue(), ^(void){
    caml_callback(callback, Val_unit);
  });
  CAMLreturn0;
}

CAMLprim value fluid_measureText(value text_v, value font_v, value fontSize_v, value maxWidth_v) {
  CAMLparam4(text_v, font_v, fontSize_v, maxWidth_v);
  CAMLlocal1(result);

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

void fluid_update_NSButton(value button_v, value title_v, value onPress_v) {
  CAMLparam3(button_v, title_v, onPress_v);

  FluidButton* button = (FluidButton*)button_v;
  NSString *title = NSString_val(title_v);

  button.title = title;
  [button setOnPress:onPress_v];

  // float top = Double_val(Field(pos_v, 0));
  // float left = Double_val(Field(pos_v, 1));

  // [button setFrameOrigin:NSMakePoint(left, top)];
  // [button setFrameSize:NSMakeSize(width, height)];

  CAMLreturn0;
}

CAMLprim value fluid_create_NSButton(value title_v, value onPress_v, value pos_v, value size_v) {
  CAMLparam4(title_v, onPress_v, pos_v, size_v);

  NSString *title = NSString_val(title_v);

  FluidButton* button = [FluidButton createWithTitle:title onPress:onPress_v];

  Double_pair(pos_v, top, left);
  // Double_pair(size_v, width, height);

  [button setFrameOrigin:NSMakePoint(left, top)];

  CAMLreturn((value) button);
}

CAMLprim value fluid_create_NSTextView(value contents_v, value pos_v, value size_v, value font_v) {
  CAMLparam4(contents_v, pos_v, size_v, font_v);

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

  Double_pair(pos_v, top, left);
  Double_pair(size_v, width, height);

  [text setFrameOrigin:NSMakePoint(left, top + 5.0)];
  [text setFrameSize:NSMakeSize(width, height)];

  // text.wantsLayer = true;
  // text.layer.backgroundColor = CGColorCreateGenericRGB(0, 1, 0, 1);

  CAMLreturn((value) text);
}

CAMLprim value fluid_update_NSView(value view_v, value onPress_v, value style_v) {
  CAMLparam3(view_v, onPress_v, style_v);

  NSView* view = (NSView*)view_v;
  printf("Update view\n");

  value backgroundColor = Field(style_v, 0);
  if (Is_block(backgroundColor) && Tag_val(backgroundColor) == 0) {
    value color = Field(backgroundColor, 0);
    Double_record4(color, r, g, b, a);
    view.wantsLayer = true;
    view.layer.backgroundColor = CGColorCreateGenericRGB(r, g, b, a);
    [view.layer setNeedsDisplay];
    printf("r %f\n", r);
  } else {
    view.wantsLayer = false;
  }

  CAMLreturn((value) view);
}


CAMLprim value fluid_create_NSView(value onPress_v, value pos_v, value size_v, value style_v) {
  CAMLparam4(onPress_v, pos_v, size_v, style_v);

  Double_pair(pos_v, top, left);
  Double_pair(size_v, width, height);
  NSRect frame;
  frame = NSMakeRect(left, top, width, height);

  NSView* view = [[FlippedView alloc] initWithFrame:frame];

  value backgroundColor = Field(style_v, 0);
  if (Is_block(backgroundColor) && Tag_val(backgroundColor) == 0) {
    value color = Field(backgroundColor, 0);
    Double_record4(color, r, g, b, a);
    view.wantsLayer = true;
    view.layer.backgroundColor = CGColorCreateGenericRGB(r, g, b, a);
  }

  CAMLreturn((value) view);
}

CAMLprim value fluid_create_NullNode() {
  CAMLparam0();
  NSView* view = [[FlippedView alloc] initWithFrame:CGRectZero];
  CAMLreturn((value) view);
}

void fluid_set_NSTextView_textContent(value text_v, value contents_v, value font_v) {
  CAMLparam3(text_v, contents_v, font_v);
  printf("set text contents\n");

  NSTextField* text = (NSTextField*)text_v;
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

  CAMLreturn0;
}