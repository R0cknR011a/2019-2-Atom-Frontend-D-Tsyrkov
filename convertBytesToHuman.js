/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
  if (typeof(bytes) !== 'number') {
    return false
  }
  if (bytes < 0) {
    return false
  }
  if (bytes % 1 !== 0) {
    return false
  }
  var prefix = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  if (bytes < 1024) {
    return bytes.toString() + ' ' + prefix[0]
  }
  i = 1
  while (Math.round(bytes / 2**(i * 10)).toString().length > 3) {
    i++
  }
  return (Math.round(bytes * 100 / 2**(i * 10)) / 100).toString() + ' ' + prefix[i]
}
