import axios, { Axios } from "axios"

class Companion {
  http: Axios = axios.create({
    baseURL: "http://192.168.0.143:4546",
    headers: {
      "Content-Type": "application/json",
    },
  })

  keyboard = {
    landingGear: async () => {
      try {
        const response = await this.http.post("/landingGear", {})
        console.log(response)
      } catch (e) {
        console.log(e)
      }
    },
  }
}

export default new Companion()
