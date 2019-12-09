import React, { useState, useMemo, memo } from "react";
import { storiesOf } from "@storybook/react";
import { usePersistedState } from "../utils";

const intcode = (memory: number[]) => {
  const log = new Array();
  log.push(memory.slice());

  let ip = 0;
  let done = false;
  let timeout = 500;
  while (!done) {
    if (timeout-- < 0) {
      break;
    }
    const instruction = memory[ip];
    switch (instruction) {
      case 1: {
        log.push("1: add");
        memory[memory[ip + 3]] =
          memory[memory[ip + 2]] + memory[memory[ip + 1]];
        ip += 4;
        log.push(memory.slice());
        break;
      }
      case 2: {
        log.push("2: mult");
        memory[memory[ip + 3]] =
          memory[memory[ip + 2]] * memory[memory[ip + 1]];
        ip += 4;
        log.push(memory.slice());
        break;
      }

      case 99: {
        log.push("99: halt");
        log.push(memory.slice());
        done = true;
        break;
      }
      default: {
        log.push(instruction + ": unknown");
        done = true;
        break;
      }
    }
  }

  return { memory, log };
};

storiesOf("day 02", module)
  .add("part 1", () => {
    const [input, setInput] = usePersistedState("day 2 part 1", "");

    const memory = input
      .trim()
      .split(",")
      .map(x => parseInt(x));

    // quick hack for d2p1 answer
    memory[1] = 12;
    memory[2] = 2;

    const { log } = intcode(memory);

    return (
      <>
        <div>
          Problem input:{" "}
          <input value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <div>Answer: {JSON.stringify(memory)} </div>
        <div>
          Log: <pre>{log.map(x => JSON.stringify(x)).join("\n")}</pre>
        </div>
      </>
    );
  })
  .add("part 2", () => {
    const [input, setInput] = usePersistedState("day 2 part 2", "");

    let answer = 0;

    outer: for (let noun = 0; noun < 100; noun++) {
      for (let verb = 0; verb < 100; verb++) {
        const memory = input
          .trim()
          .split(",")
          .map(x => parseInt(x));
        memory[1] = noun;
        memory[2] = verb;

        const { memory: memoryResult } = intcode(memory);

        if (memoryResult[0] === 19690720) {
          answer = 100 * noun + verb;
          break outer;
        }
      }
    }

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
