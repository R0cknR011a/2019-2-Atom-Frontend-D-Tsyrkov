const template = document.createElement('template');
template.innerHTML = `
    <style>
        input {
            outline: none;
            border: 0;
            width: 100vw;
            height: 4vh;
            font-size: 2vw;
            // padding: 25px 50px;
            position: absolute;
            margin-top: 6.5vh;
            border-top: 5px solid silver;
        }

        :host {
            display: inline-block;
        }
        
    </style>
    <input type="text" placeholder="...">
`;

class SearchInput extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$input = this.shadowRoot.querySelector('input');
  }

  connectedCallback() {
    this.$input.focus();
  }

  get value() {
    return this.$input.value;
  }

  set value(value) {
    this.$input.value = value;
  }
}

customElements.define('search-input', SearchInput);
