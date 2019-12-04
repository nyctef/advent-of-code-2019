import React, { useState, useMemo } from "react";
import { storiesOf } from "@storybook/react";
import { usePersistedState } from "../utils";

storiesOf("day 01", module)
  .add("part 1", () => {
    const [input, setInput] = usePersistedState("day 1 part 1", "");

    const answer = useMemo(() => {
      if (!input) {
        return "set input";
      }

      const lines = input.split(/[\r\n ]+/g);
      const nums = lines.map(x => parseInt(x));
      const fuels = nums.map(x => Math.floor(x / 3) - 2);

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
    const [input, setInput] = usePersistedState("day 1 part 2", "");

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
