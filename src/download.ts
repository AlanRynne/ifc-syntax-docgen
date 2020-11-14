import http from "http"
import unzipper from "unzipper"

export function downloadAndExtract(url: string, path: string) {
  return new Promise((resolve, reject) => {
    http.get(url, response =>
      response
        .pipe(unzipper.Extract({ path }))
        .promise()
        .then(() => {
          console.log("Finished decompressing download")
          resolve()
        })
        .catch(reject)
    )
  })
}
