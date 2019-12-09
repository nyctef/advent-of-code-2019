import React, { useState, useMemo, ReactNode } from "react";
import { storiesOf } from "@storybook/react";
import { usePersistedState } from "../utils";
import { number } from "prop-types";

const Crosshair = () => (
  <>
    <line
      x1="-10"
      x2="10"
      style={{ stroke: "rgb(255,0,0)", strokeWidth: 400 }}
    />
    <line
      y1="-10"
      y2="10"
      style={{ stroke: "rgb(255,0,0)", strokeWidth: 400 }}
    />
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

type LineSegment = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

const intersection = (l1: LineSegment, l2: LineSegment) => {
  // two lines intersect if they can't be separated on either axis
  // assuming axis-aligned lines
  if (
    (l1.x1 > l2.x1 && l1.x2 > l2.x2) ||
    (l1.x1 < l2.x1 && l1.x2 < l2.x2) ||
    (l1.y1 > l2.y1 && l1.y2 > l2.y2) ||
    (l1.y1 < l2.y1 && l1.y2 < l2.y2)
  ) {
    return null;
  }

  if ((l1.x1 === l1.x2) === (l2.x1 === l2.x2)) {
    // both lines are horizontal or both are vertical
    return null;
  }

  return (
    // the intersection point is the y value of the horizontal line
    // and the x value of the vertical line
    {
      x: l1.x1 === l1.x2 ? l1.x1 : l2.x1,
      y: l1.y1 === l1.y2 ? l1.y1 : l2.y1
    }
  );
};

const arrMin = (arr: number[]): number => Math.min(...arr);
const arrMax = (arr: number[]): number => Math.max(...arr);

storiesOf("day 03", module)
  .add("part 1", () => {
    const [input, setInput] = usePersistedState("day 3 part 1", "");

    const paths = input
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

    const lines = paths.map(line => {
      const lines = new Array<LineSegment>(line.length);
      for (let i = 0; i < lines.length; i++) {
        const left = i === 0 ? { x: 0, y: 0 } : line[i - 1];
        const right = line[i];
        lines[i] = { x1: left.x, y1: left.y, x2: right.x, y2: right.y };
      }
      return lines;
    });

    const inters = new Array<{ x: number; y: number }>();
    for (let ls1 of lines[0]) {
      for (let ls2 of lines[1]) {
        const inter = intersection(ls1, ls2);
        if (inter) {
          inters.push(inter);
        }
      }
    }

    const minX = arrMin(
      lines.map(line => arrMin(line.map(l => Math.min(l.x1, l.x2))))
    );
    const maxX = arrMax(
      lines.map(line => arrMax(line.map(l => Math.max(l.x1, l.x2))))
    );
    const minY = arrMin(
      lines.map(line => arrMin(line.map(l => Math.min(l.y1, l.y2))))
    );
    const maxY = arrMax(
      lines.map(line => arrMax(line.map(l => Math.max(l.y1, l.y2))))
    );

    const width = maxX - minX;
    const height = maxY - minY;

    const scale = 1000 / width;

    console.log({ minX, maxX, minY, maxY, width, height, scale });

    const segmentsSvg = lines.map(line =>
      line.map(segment => (
        <line
          {...segment}
          style={{ stroke: "rgb(0,0,0)", strokeWidth: Math.floor(1 / scale) }}
        />
      ))
    );

    const answer = "foo";

    const svg = (
      <svg height="500" width="1000" style={{ border: "1px solid black" }}>
        <g transform={`scale(${scale})`}>
          <g transform={`translate(${Math.abs(minX)} ${Math.abs(maxY)})`}>
            <Crosshair />
            <g>{segmentsSvg}</g>
          </g>
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
        <pre>Intersections: {JSON.stringify(inters, null, 2)}</pre>
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
