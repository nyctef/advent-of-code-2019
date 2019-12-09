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

    const fuelForMass = (mass: number) => Math.max(Math.floor(mass / 3) - 2, 0);

    const fuelForMass2 = (mass: number) => {
      let fuelMass = fuelForMass(mass);
      let additionalFuel = fuelForMass(fuelMass);
      while (true) {
        if (additionalFuel > 0) {
          //   result.push(
          //     `Fuel mass ${mass} requires additional fuel ${additionalFuel}`
          //   );
          fuelMass += additionalFuel;
        } else {
          //   result.push(`Fuel mass ${mass} can be launched`);
          break;
        }
        additionalFuel = fuelForMass(additionalFuel);
      }
      return fuelMass;
    };

    const answer = useMemo(() => {
      if (!input) {
        return ["set input"];
      }

      const lines = input.split(/[\r\n ]+/g);
      const nums = lines.map(x => parseInt(x));
      const fuels = nums.map(fuelForMass2);
      let mass = fuels.reduce((a, b) => a + b, 0);

      return mass;
    }, [input]);

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
