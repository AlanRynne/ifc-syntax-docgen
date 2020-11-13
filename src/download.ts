import http from "http"
import { resolve } from "path"
import unzipper from "unzipper"

export function downloadAndExtract(url: string, path: string) {
  return new Promise((resolve, reject) => {
    http.get(url, response =>
      response
        .pipe(unzipper.Extract({ path }))
        .promise()
        .then(() => {
          console.log("finished zip")
          resolve()
        })
        .catch(reject)
    )
  })
}
