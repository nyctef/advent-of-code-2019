import React, { useState, useMemo, memo } from "react";
import { storiesOf } from "@storybook/react";
import { usePersistedState } from "../utils";

const pop = (input: string[]) => parseInt(input.pop() || "0");

const parseInstruction = (instruction: number) => {
  const split = Array.from(instruction.toString(10));
  const opcode = pop(split) + 10 * pop(split);
  const p1mode = pop(split);
  const p2mode = pop(split);
  const p3mode = pop(split);

  return { opcode, p1mode, p2mode, p3mode };
};

const OP_ADD = 1;
const OP_MULT = 2;
const OP_INPUT = 3;
const OP_OUTPUT = 4;
const OP_HALT = 99;

const PARAM_POSITION = 0;
const PARAM_IMMEDIATE = 1;

const fetch = (memory: number[], index: number, mode: number) => {
  switch (mode) {
    case PARAM_POSITION:
      return memory[memory[index]];

    case PARAM_IMMEDIATE:
      return memory[index];

    default:
      throw "unknown mem mode " + mode;
  }
};

const intcode = (memory: number[], input: number[]) => {
  const log = new Array();
  log.push(memory.slice());

  let ip = 0;
  let done = false;
  let timeout = 500;
  while (!done) {
    if (timeout-- < 0) {
      break;
    }
    const instruction = parseInstruction(memory[ip]);
    log.push({ ...instruction, ip });
    switch (instruction.opcode) {
      case OP_ADD: {
        const addr = memory[ip + 3];
        const v1 = fetch(memory, ip + 1, instruction.p1mode);
        const v2 = fetch(memory, ip + 2, instruction.p2mode);
        log.push(`Setting ${addr} to ${v1} + ${v2} = ${v1 + v2}`);
        memory[addr] = v1 + v2;
        ip += 4;
        log.push(memory.slice());
        break;
      }

      case OP_MULT: {
        const addr = memory[ip + 3];
        const v1 = fetch(memory, ip + 1, instruction.p1mode);
        const v2 = fetch(memory, ip + 2, instruction.p2mode);
        log.push(`Setting ${addr} to ${v1} + ${v2} = ${v1 * v2}`);
        memory[addr] = v1 * v2;
        ip += 4;
        log.push(memory.slice());
        break;
      }

      case OP_INPUT: {
        const value = input.unshift();
        const addr = memory[ip + 1];
        log.push(`Setting ${addr} to ${value}`);
        memory[addr] = value;
        ip += 2;
        log.push(memory.slice());
        break;
      }

      case OP_OUTPUT: {
        log.push("output: " + fetch(memory, ip + 1, instruction.p1mode));
        ip += 2;
        break;
      }

      case OP_HALT: {
        log.push("99: halt");
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

storiesOf("day 05", module)
  .add("part 1", () => {
    const [input, setInput] = usePersistedState("day 5 part 1", "");

    const memory = input
      .trim()
      .split(",")
      .map(x => parseInt(x));

    const { log } = intcode(memory, [1]);

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
    const [input, setInput] = usePersistedState("day 5 part 2", "");

    let answer = 0;

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
