/**
 * 具体访问者实现
 */

import { TagType, TagTypeToHtml } from "./tag-type";
import { VisitorBase } from "./visitor-pattern-base";

export class Header1Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header1, new TagTypeToHtml())
  }
}

export class Header2Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header2, new TagTypeToHtml())
  }
}

export class Header3Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header3, new TagTypeToHtml())
  }
}

export class Header4Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header4, new TagTypeToHtml())
  }
}

export class Header5Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header5, new TagTypeToHtml())
  }
}

export class Header6Visitor extends VisitorBase {
  constructor() {
    super(TagType.Header6, new TagTypeToHtml())
  }
}

export class ParagraphVisitor extends VisitorBase {
  constructor() {
    super(TagType.Paragraph, new TagTypeToHtml())
  }
}

export class HorizontalRuleVisitor extends VisitorBase {
  constructor() {
    super(TagType.HorizontalRule, new TagTypeToHtml())
  }
}