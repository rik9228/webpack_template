import "@/scss/style.scss";
import "./lib/smoothScroll";

function requireAll(r: any) {
  r.keys().forEach(r);
}
requireAll(require.context("../img/svg/", true, /\.svg$/));
