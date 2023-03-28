import _ from "lodash";

const preventDefault = (event) => {
  event && event.preventDefault();
};

const ucfirst = (str) => {
  return str.charAt(0)?.toUpperCase() + str?.substr(1);
};

const joinToString = (array, delim = " ", skipEmpty = false) => {
  if (skipEmpty === true) {
    array = array.filter((item) => {
      return (
        item !== null ||
        typeof item !== "undefined" ||
        (_.isString(item) && !/^\s*$/.test(item)) ||
        (_.isArray(item) && !item.length) ||
        (_.isPlainObject(item) && !Object.values(item).length)
      );
    });
  }

  return array.join(delim);
};

const isEmptyValue = (value) => {
  return /^\s*$/.test(value);
};

const dispatchEvent = (elem, type, bubbles = true) => {
  elem.dispatchEvent(new Event(type, { bubbles }));
};

export { preventDefault, joinToString, ucfirst, isEmptyValue, dispatchEvent };
