## Array
看下lodash源码中对各种方法的实现方式，记录一下。
#### _.chunk(array, [size=1])
创建一个元素数组，分割为size的长度。如果数组不能均匀分割，最后的块将成为剩余的元素。
- 用法

chunk(['a', 'b', 'c', 'd'], 2)
=> [['a', 'b'], ['c', 'd']]
- lodash的实现方式

```
function chunk(array, size) {
  size = Math.max(size, 0)
  const length = array == null ? 0 : array.length;
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  // 设置返回数组result的length
  const result = new Array(Math.ceil(length / size))
  // 切割原数组
  // slice(array, start, end)
  // i++ 先赋值，后自增 ++i 先自增，后赋值
  while (index < length) {
    result[resIndex++] = slice(array, index, (index += size))
  }
  return result
}
```
#### _.compact(array)
过滤掉数组中为false的值
- 用法

_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]
- lodash的实现方式

```
function compact(array) {
  let resIndex = 0
  const result = []

  if (array == null) {
    return result
  }

  for (const value of array) {
    if (value) {
      result[resIndex++] = value
    }
  }
  return result
}
```