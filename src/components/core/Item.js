import React, { useState, useEffect } from "react";

import { todosRef } from "../../js/firebase";

const Item = () => {
  const [count, setCount] = useState("default");

  useEffect(() => {
    const name = todosRef.child("name");
    name.on("value", snapshot => {
      console.log("calling function");
      setCount(snapshot.val());
    });
  });

  return (
    <div>
      <h2>{count}</h2>
    </div>
  );
};

export default Item;
