import React from "react";

import {} from "framework7-react";
import Chip from "../../core/Chip";
const TagsZone = (props) => {
  const tags = [{ color: "red", text: "red" }];
  const showTags = () => {
    if (tags.length) {
      return tags.map((tag, idx) => {
        <Chip key={idx} text={tag.text} color={tag.color} />;
      });
    }
  };

  return <div style={{ height: "100px", width: "100%" }}>{showTags()}</div>;
};

export default TagsZone;
