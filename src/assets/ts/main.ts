import "@/scss/style.scss";

function requireAll(r: any) {
  r.keys().forEach(r);
}
requireAll(require.context("../img/icons/", true, /\.svg$/));

const arr = [1, 2, 3];
const hoge = "hoge";
const hoge02 =      "hoge";
console.log(hoge);









arr.forEach((elem) => console.log(elem));
