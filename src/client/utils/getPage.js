import axios from "axios";
export default async function getPage(url, accessToken = false) {
  var cfg = {};
  if (accessToken) {
    cfg = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
  }
  return await axios.get(url, cfg);
}
