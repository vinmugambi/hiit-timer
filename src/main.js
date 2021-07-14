import "./style.css";
import {hiitTimerMachine} from "./machine.js"
import { inspect } from "@xstate/inspect";
import {interpret} from "xstate"

inspect({
  iframe: false,
});


document.querySelector("#app").innerHTML = `
  <h1 class="font-bold text-2xl">Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;

interpret(hiitTimerMachine, { devTools: true }).start();
