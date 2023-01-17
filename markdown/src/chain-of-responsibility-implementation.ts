/**
 * 使用责任链模式决定应用哪个标签
 * 这种模式非常适合提出这样一个问题：“我应该处理这个标签吗？”如果答案是否定的，就把这个标签向下传递，让其他方法决定是否应该处理该标签。
 */

import { IMarkdownDocument } from "./markdown-document";
import { LineParser, ParseElement } from "./parsing-elements";
import { isNull } from "./uitl";
import { IVisitable, IVisitor, Visitable } from "./visitor-pattern-base";

export abstract class Handler<T> {
  protected next: Handler<T> | null = null;

  // 指定下一个类
  setNext(next: Handler<T>) {
    this.next = next
  }

  handleRequest(request: T): void {
    if (!this.canHandle(request)) {
      if (!isNull(this.next)) {
        this.next.handleRequest(request)
      }
      return
    }
  }

  protected abstract canHandle(request: T): boolean
}

export class ParseChainHandler extends Handler<ParseElement> {
  private readonly visitable: IVisitable = new Visitable()

  protected canHandle(request: ParseElement): boolean {
    const split = new LineParser().parse(request.currentLine, this.tagType)

    if (split[0]) {
      request.currentLine = split[1]
      this.visitable.accept(this.visitor, request, this.document)
    }

    return split[0]
  }

  constructor(private readonly document: IMarkdownDocument,
    private readonly tagType: string,
    private readonly visitor: IVisitor) {
      super()
    }
}