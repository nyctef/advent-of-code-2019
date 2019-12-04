import React, { useState, useMemo, ReactNode } from "react";
import { storiesOf } from "@storybook/react";
import { usePersistedState } from "../utils";
import { number } from "prop-types";

const Crosshair = () => (
  <>
    <line x1="-10" x2="10" style={{ stroke: "rgb(255,0,0)", strokeWidth: 2 }} />
    <line y1="-10" y2="10" style={{ stroke: "rgb(255,0,0)", strokeWidth: 2 }} />
  </>
);

const applyStep = (
  acc: { x: number; y: number },
  { dir, length }: { dir: string; length: number }
) => {
  switch (dir) {
    case "U":
      return { ...acc, y: acc.y + length };
    case "D":
      return { ...acc, y: acc.y - length };
    case "L":
      return { ...acc, x: acc.x - length };
    case "R":
      return { ...acc, x: acc.x + length };
    default:
      return acc;
  }
};

storiesOf("day 03", module)
  .add("part 1", () => {
    const [input, setInput] = usePersistedState("day 3 part 1", "");

    const lines = input
      .split(/[\r\n ]+/g)
      .map(line =>
        line
          .split(",")
          .map(step => ({ dir: step[0], length: parseInt(step.substr(1)) }))
      )
      .map(line => {
        const positions = new Array<{ x: number; y: number }>(line.length);
        for (let i = 0; i < line.length; i++) {
          positions[i] = applyStep(
            i === 0 ? { x: 0, y: 0 } : positions[i - 1],
            line[i]
          );
        }
        return positions;
      });

    const segments = lines.map(line => {
      const segments = new Array<ReactNode>(line.length);
      for (let i = 0; i < segments.length; i++) {
        const left = i === 0 ? { x: 0, y: 0 } : line[i - 1];
        const right = line[i];

        segments[i] = (
          <line
            x1={left.x}
            y1={left.y}
            x2={right.x}
            y2={right.y}
            style={{ stroke: "rgb(255,0,0)", strokeWidth: 10 }}
          />
        );

        console.log({ left, right });
      }
      return segments;
    });

    const answer = "foo";

    const svg = (
      <svg height="3000" width="3000" style={{ border: "1px solid black" }}>
        <g transform="translate(150,150) scale(0.1)">
          <Crosshair />
          <g>{segments}</g>
        </g>
      </svg>
    );

    return (
      <>
        <div>
          Problem input:{" "}
          <input value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <div>Answer: {answer} </div>
        <div>Viz: {svg} </div>
        <pre>Lines: {JSON.stringify(lines, null, 2)}</pre>
      </>
    );
  })
  .add("part 2", () => {
    const [input, setInput] = usePersistedState("day 3 part 2", "");

    const answer = "bar";

    return (
      <>
        <div>
          Problem input:{" "}
          <input value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <div>Answer: {answer}</div>
      </>
    );
  });
