/**
 * 上海部分运营商会将五位客服短号以 021 + 短号 的形式呈现。
 * 这不是用于拨号的号码，只是为来电显示增加一个匹配别名。
 */
// 已审查上游现有的五位号码：均为客服、政务或行业服务短号，适合作为来显别名。
const isShanghaiPrefixedShortCode = (phone) => /^\d{5}$/.test(String(phone))

export const addShanghaiCallerIdAliases = (phones = []) => {
  const existing = new Set(
    phones.map((phone) => String(typeof phone === 'object' ? phone.number : phone))
  )
  const aliases = []

  for (const phone of phones) {
    const number = typeof phone === 'object' ? phone.number : phone
    if (!isShanghaiPrefixedShortCode(number)) continue

    const alias = `021${number}`
    if (existing.has(alias)) continue
    existing.add(alias)

    aliases.push(
      typeof phone === 'object'
        ? { number: alias, label: `${phone.label}（上海来显）` }
        : { number: alias, label: '上海来显' }
    )
  }

  return [...phones, ...aliases]
}
