import { Header1ChainHandler, Header2ChainHandler, Header3ChainHandler, Header4ChainHandler, Header5ChainHandler, Header6ChainHandler, HorizontalRuleChainHandler, ParagraphHandler } from "./chain-of-responsibility";
import { ParseChainHandler } from "./chain-of-responsibility-implementation";
import { IMarkdownDocument, MarkdownDocument } from "./markdown-document";
import { ParseElement } from "./parsing-elements";
import { isNull, queryById } from "./uitl";

/**
 * 设置处理程序链: 将责任链模式与访问者模式关联了起来
 */
class ChainOfResponsibilityFactory {
  build(document: IMarkdownDocument): ParseChainHandler {
    const head1: Header1ChainHandler = new Header1ChainHandler(document)
    const head2: Header2ChainHandler = new Header2ChainHandler(document)
    const head3: Header3ChainHandler = new Header3ChainHandler(document)
    const head4: Header4ChainHandler = new Header4ChainHandler(document)
    const head5: Header5ChainHandler = new Header5ChainHandler(document)
    const head6: Header6ChainHandler = new Header6ChainHandler(document)
    
    const horizontalRule = new HorizontalRuleChainHandler(document)

    const paragraph = new ParagraphHandler(document)

    head1.setNext(head2)
    head2.setNext(head3)
    head3.setNext(head4)
    head4.setNext(head5)
    head5.setNext(head6)
    head6.setNext(horizontalRule)
    horizontalRule.setNext(paragraph)

    return head1
  }
}

class Markdown {
  toHtml(text: string): string {
    const document: IMarkdownDocument = new MarkdownDocument()
    const header1: Header1ChainHandler = new ChainOfResponsibilityFactory().build(document)

    const lines: string[] = text.split(`\n`)
    for (let i = 0; i < lines.length; i++) {
      const parseElement: ParseElement = new ParseElement();
      parseElement.currentLine = lines[i]
      header1.handleRequest(parseElement)
    }

    return document.get()
  }
}

export class HtmlHandler {
  private markdownChange: Markdown = new Markdown();

  // 当 输入的text文本更新，自动更新web页面
  TextChangeHandler(id: string, output: string): void {
    const markdown = queryById(id) as HTMLTextAreaElement;
    const markdownOutput = queryById(output) as HTMLLabelElement;
    if (!isNull(markdown)) {
      markdown.onkeyup = () => {
        this.renderHtmlContent(markdown, markdownOutput)
      }

      // 处理页面刷新丢失内容的问题
      window.onload = () => {
        this.renderHtmlContent(markdown, markdownOutput)
      }
    }
  }

  private renderHtmlContent(markdown: HTMLTextAreaElement, markdownOutput: HTMLLabelElement) {
    if (markdown.value) {
      markdownOutput.innerHTML = this.markdownChange.toHtml(markdown.value)
    } else {
      markdownOutput.innerHTML = "<p></p>"
    }
  }
}