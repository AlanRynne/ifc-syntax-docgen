import fs from "fs"
import GenerateIndex from "./GenerateIndex"

export var sentOptions = {
  newline_boundaries: false,
  html_boundaries: false,
  sanitize: true,
  preserve_whitespace: false
}
const SCHEMA_PATH = "data/ifc4x2/schema/"

GenerateIndex(SCHEMA_PATH)
  .then((index: any) => {
    fs.writeFileSync("results/ifc4x2.json", JSON.stringify(index, null, 4))
  })
  .catch(err => {
    console.warn(err)
  })
