import React, { useState, useEffect } from "react";
import Icon from "@js/components/Icon";
import Input from "@js/components/Form/Input";

const defaultProps = {
  maxCount: 100,
  maxCharsCount: 0,
  maxWordsCount: 0,
  inputProps: {},
  tags: [],
};

const useInputTags = (props = {}) => {
  const {
    tags: defaultTags = [],
    maxCount,
    onInput,
    onKeyDown,
  } = {
    ...defaultProps,
    ...props,
  };

  const [tags, setTags] = useState(defaultTags);
  const isTagsReachedLimit = tags.length >= maxCount;

  const hasTag = (text) => {
    return tags.some((tag) => tag.toLowerCase() === text.trim().toLowerCase());
  };

  const appendTag = (text) => {
    text = text && text.trim();
    if (!isTagsReachedLimit && text !== "" && !hasTag(text)) {
      setTags([...tags, ...[text]]);

      return true;
    }

    return false;
  };

  const removeTag = (idx) => {
    tags.splice(idx, 1);
    setTags([...tags]);
  };

  const handleInputInput = (event) => {
    // const _this = event.currentTarget;
    // if (maxWordsCount > 0) {
    //   let words = _this.value.split(" ");
    //   if (words.length >= maxWordsCount) {
    //     _this.value = words.slice(0, maxCharsCount).join(" ");
    //     return;
    //   }
    // }
    onInput && onInput(event);
  };

  const handleInputPress = (event) => {
    const _this = event.currentTarget;
    const KEYCODE_ENTER = event.keyCode == 13;
    const KEYCODE_DELIM = event.keyCode == 188;

    if (KEYCODE_ENTER) {
      event.preventDefault();
    }

    setTimeout(() => {
      let value = _this.value.replace(/\s{2,}/, " ").trim();

      if (KEYCODE_ENTER || KEYCODE_DELIM) {
        let txt = value.replace(",", "");

        if (appendTag(txt)) {
          _this.value = "";
        }
      }
    }, 0);

    onKeyDown && onKeyDown(event);
  };

  return {
    tags,
    isTagsReachedLimit,
    hasTag,
    appendTag,
    removeTag,
    handleInputPress,
    handleInputInput,
  };
};

const InputTags = (props) => {
  const { placeholder, name, btnRemoveProps, tagProps, tagTextProps } = props;
  const it = useInputTags(props);

  return (
    <>
      <div className="input-tags">
        {it.tags?.map((tag, index) => (
          <span
            key={tag}
            {...tagProps}
            className="input-tag d-flex align-items-center"
          >
            <span {...tagTextProps} className="input-tag-text mr-2">
              {tag}
            </span>
            <span
              {...btnRemoveProps}
              className="input-tag-action"
              onClick={() => it.removeTag(index)}
            >
              <Icon name="x-lg" />
            </span>
          </span>
        ))}

        {!it.isTagsReachedLimit ? (
          <input
            name={name}
            placeholder={placeholder}
            className={""}
            onInput={it.handleInput}
            onKeyDown={it.handleInputPress}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default InputTags;
