export interface IMarkdownDocument {
  add(...content : string[]) : void;
  get() : string;
}

/**
 * 单一职责
 */
export class MarkdownDocument implements IMarkdownDocument {
  private content: string = ""

  add(...content : string[]) : void{
    content.forEach(el => this.content += el)
  }

  get(): string {
    return this.content
  }
}