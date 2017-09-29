/**
 * @param  {Array.<string|Object>} items
 * @return {string}
 */
export const getClassName = (items) =>
  items
  .map((x) =>
    typeof x === 'object' && x !== null
    ? Object.keys(x)
      .filter((key) => x[key])
      .join(' ')
    : String(x)
  )
  .filter(Boolean)
  .join(' ');

/**
 * Returns a string representation of the given value that is at least 2 digits long.
 * @param  {number} x
 * @return {string}
 */
export const pad2Digit = (x) =>
  x.toFixed(0).padStart(2, '0');
