// RFC 6350 要求超过 75 个字节的 vCard 属性行使用空格续行。
// 照片为 ASCII Base64，因此按字符折行即等同于按字节折行。
export const foldVCardLine = (line) => {
  const lines = []
  let remaining = line

  while (remaining.length > 75) {
    lines.push(remaining.slice(0, 75))
    remaining = ` ${remaining.slice(75)}`
  }
  lines.push(remaining)

  return lines.join('\r\n')
}
