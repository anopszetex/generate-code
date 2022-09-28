export default class Util {
  /**
   *
   * @param {Object}  args
   * @param {string}  args.str - string to transform
   * @param {boolean} args.upperCase - if true, transform to PascalCase, otherwise to camelCase
   * @returns {string}
   */
  static #transform({ str, upperCase }) {
    if (!str.trim().length) {
      return '';
    }

    if (upperCase) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  /**
   * transform a string to PascalCase
   *
   * @param {string} str
   * @returns {string}
   */
  static upperCaseFirstLetter(str) {
    return Util.#transform({ str, upperCase: true });
  }

  /**
   * transform a string to camelCase
   *
   * @param {string} str
   * @returns {string}
   */
  static lowerCaseFirstLetter(str) {
    return Util.#transform({ str, upperCase: false });
  }
}
