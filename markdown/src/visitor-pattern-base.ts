import { IMarkdownDocument } from "./markdown-document";
import { ParseElement } from "./parsing-elements";
import { TagType, TagTypeToHtml } from "./tag-type";

/**
 * 访问者模式：指的是关注类和对象的通信方式的一组模式
 * 选择原因： 
 */

export interface IVisitor {
  visit(token: ParseElement, markdwonDocument: IMarkdownDocument): void
}

export interface IVisitable {
  accept(visitor: IVisitor, token: ParseElement, markdwonDocument: IMarkdownDocument): void
}

export class Visitable implements IVisitable {
  accept(visitor: IVisitor, token: ParseElement, markdwonDocument: IMarkdownDocument): void {
    visitor.visit(token, markdwonDocument)
  }
}

export abstract class VisitorBase implements IVisitor {
  constructor(private readonly tagType: TagType, 
            private readonly tagTypeToHtml: TagTypeToHtml) {}

  visit(token: ParseElement, markdwonDocument: IMarkdownDocument): void {
    markdwonDocument.add(this.tagTypeToHtml.openingTag(this.tagType), token.currentLine, this.tagTypeToHtml.closingTag(this.tagType));
  }
}