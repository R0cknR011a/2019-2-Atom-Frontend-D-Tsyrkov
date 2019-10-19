const template = document.createElement('template');
template.innerHTML = `
    <style>
        input {
            // border: 0;
            // border-top: 5px solid silver;
            outline: none;
            width: 100vw;
            height: 7vh;
            font-size: 5vw;
            padding: 25px 50px;
            position: fixed;
            top: 1100px;
            border-top: 5px solid silver;
        }

        :host {
            display: inline-block;
        }
        
    </style>
    <input type="text">
`;

class DialogInput extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$input = this.shadowRoot.querySelector('input');
  }

  static get observedAttributes() {
    return ['value', 'placeholder', 'disabled'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.$input.setAttribute(name, newValue);
  }

  get value() {
    return this.$input.value;
  }

  set value(newValue) {
    this.$input.value = newValue;
  }
}

customElements.define('dialog-input', DialogInput);
