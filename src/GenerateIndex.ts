import glob from "glob"
import ExtractEntityFromFile from "./ExtractEntityFromFile"

export default function GenerateIndex(dir: string) {
  console.log("Started generating Docs")
  return new Promise<any>((resolve, reject) => {
    const result: any = {
      version: "IFC4X2",
      entities: {},
      domains: {}
    }
    // Get all files in schema docs
    glob(dir + "ifc*/lexical/*.htm", (err, files) => {
      if (err) reject(err)
      files.forEach(path => {
        // Extract url data
        const parts = path.split("/")
        const category = parts[2]
        const filename = parts[parts.length - 1].split(".htm")[0]

        //console.log(`Processing ${filename}`)
        result.entities[filename] = {}
        if (!result.domains[category]) result.domains[category] = []
        result.domains[category].push(filename)
        try {
          const [name, item]: any = ExtractEntityFromFile(path, filename)
          result.entities[filename] = item
        } catch (error) {
          console.error(error.message)
          result.entities[filename] = null
        }
      })
      console.log("Finished generating Docs")
      resolve(result)
    })
  })
}
