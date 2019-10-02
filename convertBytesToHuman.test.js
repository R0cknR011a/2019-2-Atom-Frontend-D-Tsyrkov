/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-1231)).toBe(false)
  expect(convertBytesToHuman('string')).toBe(false)
  expect(convertBytesToHuman(1123324789.5)).toBe(false)
  expect(convertBytesToHuman([1, 2, 3, 4, 5])).toBe(false)
});

test('Возвращает корректное значение для чисел', () => {
  for (var i = 0; i < 1024; i++) {
    expect(convertBytesToHuman(i)).toBe(i.toString() + ' ' + 'B')
  }
  expect(convertBytesToHuman(123123)).toBe('120.24 KB')
  expect(convertBytesToHuman(123456789)).toBe('117.74 MB')
  expect(convertBytesToHuman(123456789123)).toBe('114.98 GB')
  expect(convertBytesToHuman(123456789123456)).toBe('112.28 TB')
  expect(convertBytesToHuman(123456789123456789)).toBe('109.65 PB')
});

// другая группа проверок
