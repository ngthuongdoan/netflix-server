type Dictionary = { [index: string]: any };
/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = (object: Dictionary, keys: string[]) => {
  return keys.reduce((obj: Dictionary, key: string) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      if (key in obj) {
        obj[key] = object[key];
      }
    }
    return obj;
  }, {});
};

export default pick;
