import "./style.css";
import "../node_modules/bootstrap/scss/bootstrap.scss";
import { HtmlHandler } from "./markdown-parser";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container-fluid h-100">
    <div class="row h-100">
      <div class="col-6">
        <textarea class="form-control h-100" id="markdown"></textarea>
      </div>
      <div class="col-6 h-100">
        <label class="full-width h-100" id="markdown-input"></label>
      </div>
    </div>
  </div>
`;
new HtmlHandler().TextChangeHandler("markdown", "markdown-input");
