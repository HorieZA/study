console.log("자바스크립트")

import { Command } from "commander";
import { add, mody, ret, list } from "./cmd.js";

const program = new Command();

program
  .command('add')
  .argument('<cont>')
  .argument('<check>')
  .description('메모 추가')
  .action((cont, check) => add(cont, check));

program
  .command('mody')
  .argument('<key>')
  .argument('<cont>')
  .argument('<check>')
  .description('메모 수정')
  .action((key, cont, check) => mody(key, cont, check));

program
  .command('ret')
  .argument('<key>')
  .description('메모 수정')
  .action((key) => ret(key));

program
  .command('list')
  .description('목록보기')
  .action(list);

// program
//   .command('add')
//   .argument('<content>')
//   .description('메모 추가')
//   .action(add);

program.parse(process.argv);