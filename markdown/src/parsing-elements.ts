export class LineParser {
  parse(value: string, tag: string): [boolean, string] {
    const output: [boolean, string] = [false, value]

    if (value === '') {
      return output
    }

    const split = value.startsWith(`${tag}`)
    if (split) {
      output[0] = true
      output[1] = value.substring(tag.length)
    }

    return output
  }
}

/** 
 * 每次只解析一行，
 * 
 * 如果只是使用一个字符串来表示当前行，那么当我们想要使用该行时，很容易传递错误的值
 */
export class ParseElement {
  currentLine: string = '' // 正在解析的当前行
}