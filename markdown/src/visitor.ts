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