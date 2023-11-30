import qs from "qs";

export function getQueryUrlParams(url) {
  const base = document.location.protocol + "//" + document.location.host;
  const query = new URL(base + url).searchParams.toString();
  const params = qs.parse(query);
  return params;
}
