"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
exports.sleep = sleep;
