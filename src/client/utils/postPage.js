import axios from "axios";
export default async function postPage(url, data, accessToken = false) {
  var cfg = {};
  if (accessToken) {
    cfg = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
  }
  return await axios.post(url, data, cfg);
}
