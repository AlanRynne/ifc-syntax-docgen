import fs from "fs"
import { downloadAndExtract } from "./download"
import GenerateIndex from "./GenerateIndex"

export var sentOptions = {
  newline_boundaries: false,
  html_boundaries: false,
  sanitize: true,
  preserve_whitespace: false
}
const SCHEMA_VERSION = "ifc4x2"
const SCHEMA_URL =
  "http://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/IFC4_2-HTML.zip"
const SCHEMA_PATH = `data/${SCHEMA_VERSION}/HTML/schema/`

extractDocInfo(SCHEMA_VERSION, SCHEMA_URL, SCHEMA_PATH)

function extractDocInfo(version: string, url: string, outputPath: string) {
  downloadAndExtract(url, `data/${version}/`)
    .then(() => GenerateIndex(outputPath))
    .then((index: any) => {
      fs.writeFileSync(
        `results/${version}docs.json`,
        JSON.stringify(index, null, 4)
      )
    })
    .catch(err => {
      console.warn(err)
    })
}
