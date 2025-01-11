import Collapse from "../node_modules/bootstrap/js/src/collapse.js";

Array.from(document.querySelectorAll(".accordion .collaspse")).forEach(
  (collapseNode) => new Collapse(collapseNode)
);

