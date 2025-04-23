const { formatDate, calculateTotal, filterByProperty, sortByField } = require('../../utils/dataUtils');

describe('formatDate', () => {
  test('должен корректно форматировать дату в формат ДД.ММ.ГГГГ', () => {
    const date = new Date(2023, 0, 15); // 15 января 2023
    expect(formatDate(date)).toBe('15.01.2023');
  });

  test('должен корректно обрабатывать строковое представление даты', () => {
    expect(formatDate('2023-02-20')).toBe('20.02.2023');
  });

  test('должен возвращать пустую строку для некорректной даты', () => {
    expect(formatDate('invalid-date')).toBe('');
    expect(formatDate(null)).toBe('');
    expect(formatDate(undefined)).toBe('');
  });
});

describe('calculateTotal', () => {
  test('должен корректно суммировать числа в массиве', () => {
    expect(calculateTotal([1, 2, 3, 4])).toBe(10);
    expect(calculateTotal([1.5, 2.5])).toBe(4);
  });

  test('должен возвращать 0 для пустого массива', () => {
    expect(calculateTotal([])).toBe(0);
  });

  test('должен корректно обрабатывать некорректные входные данные', () => {
    expect(calculateTotal(null)).toBe(0);
    expect(calculateTotal(undefined)).toBe(0);
    expect(calculateTotal(['1', '2', 'abc', 3])).toBe(6); // 'abc' должен быть преобразован в 0
  });
});

describe('filterByProperty', () => {
  const testArray = [
    { id: 1, category: 'A', value: 10 },
    { id: 2, category: 'B', value: 20 },
    { id: 3, category: 'A', value: 30 }
  ];

  test('должен фильтровать массив объектов по указанному свойству', () => {
    expect(filterByProperty(testArray, 'category', 'A')).toEqual([
      { id: 1, category: 'A', value: 10 },
      { id: 3, category: 'A', value: 30 }
    ]);
  });

  test('должен возвращать пустой массив, если совпадений нет', () => {
    expect(filterByProperty(testArray, 'category', 'C')).toEqual([]);
  });

  test('должен корректно обрабатывать некорректные входные данные', () => {
    expect(filterByProperty(null, 'category', 'A')).toEqual([]);
    expect(filterByProperty(undefined, 'category', 'A')).toEqual([]);
    expect(filterByProperty(testArray, 'nonexistent', 'value')).toEqual([]);
  });
});

describe('sortByField', () => {
  const testArray = [
    { id: 2, name: 'Борис', value: 20 },
    { id: 1, name: 'Анна', value: 30 },
    { id: 3, name: 'Виктор', value: 10 }
  ];

  test('должен сортировать массив объектов по возрастанию', () => {
    const sorted = sortByField(testArray, 'value', 'asc');
    expect(sorted[0].value).toBe(10);
    expect(sorted[1].value).toBe(20);
    expect(sorted[2].value).toBe(30);
  });

  test('должен сортировать массив объектов по убыванию', () => {
    const sorted = sortByField(testArray, 'value', 'desc');
    expect(sorted[0].value).toBe(30);
    expect(sorted[1].value).toBe(20);
    expect(sorted[2].value).toBe(10);
  });

  test('должен корректно сортировать строковые значения', () => {
    const sorted = sortByField(testArray, 'name', 'asc');
    expect(sorted[0].name).toBe('Анна');
    expect(sorted[1].name).toBe('Борис');
    expect(sorted[2].name).toBe('Виктор');
  });

  test('должен возвращать исходный массив для некорректных входных данных', () => {
    // Тест на отсутствующее поле
    expect(sortByField(testArray, '', 'asc')).toEqual(testArray);
    
    // Тест на некорректное направление сортировки
    expect(sortByField(testArray, 'value', 'invalid')).toEqual(testArray);
    
    // Тест на некорректный массив
    expect(sortByField(null, 'value', 'asc')).toEqual([]);
  });
}); 