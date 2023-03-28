import Inputmask from "inputmask/dist/inputmask.es6";

Inputmask.extendAliases({
  number: {
    alias: "numeric",
    inputmode: "number",
    digits: 0,
    greedy: false,
    numericInput: true,
    showMaskOnHover: true,
    showMaskOnFocus: true,
  },
  integer: {},
  percentage: {},
  decimal: {
    alias: "numeric",
    digits: 2,
    radixPoint: ".",
    placeholder: "0.00",
    greedy: false,
    numericInput: true,
    showMaskOnHover: true,
    showMaskOnFocus: true,
  },
  weight: {
    alias: "numeric",
    digits: 3,
    radixPoint: ".",
    groupSeparator: " ",
    placeholder: "0.000",
    greedy: false,
    numericInput: true,
    showMaskOnHover: true,
    showMaskOnFocus: true,
  },
  currency: {
    digits: 2,
    max: 10000000000,
    radixPoint: ".",
    groupSeparator: " ",
    placeholder: "0.00",
    greedy: false,
    autoGroup: true,
    numericInput: true,
    showMaskOnHover: true,
    showMaskOnFocus: true,
  },
  phone: {
    mask: "+7 (999) 999 9999",
    placeholder: "+7 (___) ___ ____",
    greedy: false,
    onBeforePaste: function (value, opts) {
      var newValue = value.replace(/(\+\d|\(|\)|\_|\-|\:|\_|\s)+/g, "");
      var length = newValue.length;

      if (length < 13) {
        var nums = [];

        switch (length) {
          case 12:
            nums = [
              [newValue[0], newValue[1], newValue[2], newValue[3], newValue[4]],
              [newValue[5], newValue[6], newValue[7]],
              [newValue[8], newValue[9], newValue[10], newValue[11]],
            ];
            break;
          case 11:
            nums = [
              [newValue[0], newValue[1], newValue[2], newValue[3]],
              [newValue[4], newValue[5], newValue[6]],
              [newValue[7], newValue[8], newValue[9], newValue[10]],
            ];
            break;
          default:
            nums = [
              [newValue[0], newValue[1], newValue[2]],
              [newValue[3], newValue[4], newValue[5]],
              [newValue[6], newValue[7], newValue[8], newValue[9]],
            ];
        }

        this.$el.val(nums.join(" "));
      }
    },
  },
});

export default Inputmask;
