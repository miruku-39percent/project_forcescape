/*window __DIP,__uv$config*/
import { swSupported } from "../scripts/proxy";

export function getSearchEngine() {
  var engine = localStorage.getItem("engine");

  switch (engine) {
    case "DuckDuckGo":
      return "https://duckduckgo.com/?q=";
    case "Bing":
      return "https://www.bing.com/search?q=";
    case "Brave":
      return "https://search.brave.com/search?q=";
    default:
    case "Google":
      return "https://www.google.com/search?a=";
  }
}

function searchURL(url) {
  if (url.match(/^https?:\/\//)) {
    return url;
  } else if (url.includes(".") && !url.includes(" ")) {
    return "https://" + url;
  } else {
    return getSearchEngine() + encodeURIComponent(url);
  }
}

export function getLink(url) {
  if (!swSupported)
    throw new Error("Your browser doesn't support service workers.");

  url = searchURL(url);

  return new URL(
    // @ts-expect-error
    __uv$config.encodeUrl(url),
    // @ts-expect-error
    new URL(__uv$config.prefix, window.location)
  ).toString();
}

export function getWindowLocation(page) {
 return page.contentWindow.__uv$location.toString()
}

export const checkFQDN = (url: string) => {
  const regex = new RegExp(
    "^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$"
  );
  return regex.test(url);
}