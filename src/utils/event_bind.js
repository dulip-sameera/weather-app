export default function event_bind({ event, fn, element }) {
  if (!(element instanceof NodeList)) {
    element.addEventListener(event, fn);
    return;
  }

  element.forEach((ele) => {
    ele.addEventListener(event, fn);
  });
}
