import React, { useState, useMemo } from "react";
import { storiesOf } from "@storybook/react";
import { usePersistedState } from "../utils";

storiesOf("day 04", module)
  .add("part 1", () => {
    const [input, setInput] = usePersistedState("day 4 part 1", "");

    const [lower, upper] = input
      .trim()
      .split("-")
      .map(x => parseInt(x));

    const answer = new Array();

    for (let i = lower; i <= upper; i++) {
      const istr = `${i}`;

      let hasPair = false;
      let monotonic = true;

      for (let c = 1; c < istr.length; c++) {
        if (istr[c] === istr[c - 1]) {
          hasPair = true;
        }
        if (parseInt(istr[c]) < parseInt(istr[c - 1])) {
          monotonic = false;
        }
      }

      if (hasPair && monotonic) {
        answer.push(istr);
      }
    }

    return (
      <>
        <div>
          Problem input:{" "}
          <input value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <div>Length: {answer.length} </div>
        <div>Answer: {JSON.stringify(answer)} </div>
      </>
    );
  })
  .add("part 2", () => {
    const [input, setInput] = usePersistedState("day 4 part 2", "");

    const [lower, upper] = input
      .trim()
      .split("-")
      .map(x => parseInt(x));

    const answer = new Array();

    const pairNumberRegex = new Array(10)
      .fill(null)
      .map((_, i) => `(([^${i}]|\\b)${i}${i}([^${i}]|\\b))`)
      .join("|");

    for (let i = lower; i <= upper; i++) {
      const istr = `${i}`;

      let hasPair = istr.match(pairNumberRegex);
      let monotonic = true;

      for (let c = 1; c < istr.length; c++) {
        if (parseInt(istr[c]) < parseInt(istr[c - 1])) {
          monotonic = false;
        }
      }

      if (hasPair && monotonic) {
        answer.push(istr);
      }
    }

    return (
      <>
        <div>
          Problem input:{" "}
          <input value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <div>Regex: {pairNumberRegex.toString()} </div>
        <div>Length: {answer.length} </div>
        <div>Answer: {JSON.stringify(answer)} </div>
      </>
    );
  });
