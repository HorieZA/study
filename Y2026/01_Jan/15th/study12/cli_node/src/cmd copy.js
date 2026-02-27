import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/memo.json')

export const list = () => {
  console.log("list() 호출됨")
  const f = fs.readFileSync(filePath, 'utf-8')
  console.log(f)
}