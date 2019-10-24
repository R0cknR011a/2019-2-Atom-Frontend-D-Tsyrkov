const template = document.createElement('template');
template.innerHTML = `
    <style>
        input {
          outline: none;
          width: 80vw;
          height: 7vh;
          font-size: 5vw;
          padding: 25px 50px;
          position: fixed;
          bottom: 15vh;
          left: 4vw;
          border-radius: 2vh;
          border-top: 5px solid silver;
        }

        :host {
            display: inline-block;
        }
        
    </style>
    <input type="text" placeholder="Введите имя пользователя...">
`;

class DialogInput extends HTMLElement {
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

customElements.define('dialog-input', DialogInput);
