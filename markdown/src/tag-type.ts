import { isNull } from "./uitl";

/**
 * 标签类型
 */
export enum TagType {
  Paragraph,
  Header1,
  Header2,
  Header3,
  HorizontalRule
}


/**
 * 处理映射：单一职责 把tagType映射到相应的HTML标签
 */
export class TagTypeToHtml {
  // readonly 可以能够安全地在构造函数中设置映射，因为实例化后不可以更改
  private readonly tagType: Map<TagType, string> = new Map<TagType, string>();
  
  constructor() {
    this.tagType.set(TagType.Header1, "h1");
    this.tagType.set(TagType.Header2, "h2");
    this.tagType.set(TagType.Header3, "h3");
    this.tagType.set(TagType.Paragraph, "p");
    this.tagType.set(TagType.HorizontalRule, "hr")
  }

  /**开标签 */
  openingTag(tagType: TagType): string {
    return this.getTag(tagType,'<')
  }

  /**闭标签 */
  closingTag(tagType: TagType): string {
    return this.getTag(tagType,'</')
  }

  private getTag(tagType: TagType, openingTagPattern: string): string {
    const tag = this.tagType.get(tagType)
    if (!isNull(tag)) {
      return `${openingTagPattern}${tag}>`
    }
    return `${openingTagPattern}p>`
  }
}