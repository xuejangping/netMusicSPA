import axios from 'axios'
const baseURL = 'https://netease-cloud-music-api-ecru-gamma.vercel.app/'
export default function (method, url, data) {
  return new Promise((resolve, reject) => {
    axios({ method, url, ...data, baseURL }).then(val => {
      resolve(val.data)
    }).catch(err => console.log(err))
  })
}
