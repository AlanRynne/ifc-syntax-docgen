import fs from "fs"
import { downloadAndExtract } from "./download"
import GenerateIndex from "./GenerateIndex"

const schemas = [
  {
    version: "ifc4x2",
    url:
      "http://standards.buildingsmart.org/IFC/DEV/IFC4_2/FINAL/IFC4_2-HTML.zip"
  }
]

schemas.forEach(
  async schema => await extractDocInfo(schema.version, schema.url)
)

async function extractDocInfo(version: string, url: string) {
  var folder = `data/${version}`
  var path = `${folder}/HTML/schema/`
  if (!fs.existsSync(folder)) {
    console.log("Downloading " + version)
    await downloadAndExtract(url, folder)
  }

  GenerateIndex(version, path)
    .then((index: any) => {
      fs.writeFileSync(
        `out/${version}docs.json`,
        JSON.stringify(index, null, 4)
      )
    })
    .catch(err => {
      console.warn(err)
    })
}
