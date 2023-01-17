import {
  Handler,
  ParseChainHandler,
} from "./chain-of-responsibility-implementation";
import { IMarkdownDocument } from "./markdown-document";
import { ParseElement } from "./parsing-elements";
import {
  BlockquoteVisitor,
  Header1Visitor,
  Header2Visitor,
  Header3Visitor,
  Header4Visitor,
  Header5Visitor,
  Header6Visitor,
  HorizontalRuleVisitor,
  ParagraphVisitor,
} from "./visitor";
import { IVisitable, IVisitor, Visitable } from "./visitor-pattern-base";

export class Header1ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "# ", new Header1Visitor());
  }
}

export class Header2ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "## ", new Header2Visitor());
  }
}

export class Header3ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "### ", new Header3Visitor());
  }
}
export class Header4ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "#### ", new Header4Visitor());
  }
}
export class Header5ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "##### ", new Header5Visitor());
  }
}
export class Header6ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "###### ", new Header6Visitor());
  }
}

export class HorizontalRuleChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "---", new HorizontalRuleVisitor());
  }
}

export class BlockquoteChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "> ", new BlockquoteVisitor());
  }
}

/**
 * 处理特殊情况：段落没有关联的标签
 * 如果类链中没有p匹配的标签，则默认该文本是一个段落
 */
export class ParagraphHandler extends Handler<ParseElement> {
  private readonly visitable: IVisitable = new Visitable();

  private readonly visitor: IVisitor = new ParagraphVisitor();

  constructor(private readonly document: IMarkdownDocument) {
    super();
  }

  protected canHandle(request: ParseElement): boolean {
    this.visitable.accept(this.visitor, request, this.document);

    return true;
  }
}
