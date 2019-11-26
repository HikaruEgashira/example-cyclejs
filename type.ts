import { DOMSource } from "@cycle/dom";
import { Stream } from "xstream";
export type SoDOM = { DOM: DOMSource }; // DOM driver から受け取る
export type SiDOM = { DOM: Stream<JSX.Element> }; // DOM driver に渡す
