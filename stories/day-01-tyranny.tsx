import React, { useState, useMemo } from "react";
import { storiesOf } from "@storybook/react";

storiesOf("day 01", module)
  .add("part 1", () => {
    const [input, setInput] = useState<string>("");

    const answer = useMemo(() => {
      if (!input) {
        return "set input";
      }

      const lines = input.split(/[\r\n ]+/g);
      const nums = lines.map(x => parseInt(x));
      const fuels = nums.map(x => Math.floor(x / 3) - 2);

      console.log({ lines, nums, fuels });
      return fuels.reduce((a, b) => a + b, 0);
    }, [input]);

    return (
      <>
        <div>
          Problem input:{" "}
          <input value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <div>Answer: {answer} </div>
      </>
    );
  })
  .add("part 2", () => {
    return <></>;
  });
