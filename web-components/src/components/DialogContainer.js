const template = document.createElement('template');
template.innerHTML = `
  <style>
    .wrapper {
      border: 1px solid blue;
      cursor: pointer;
      width: 100vw;
      text-align: start;
      border: 1px solid rgb(212, 1, 254);
      outline: none;
    }
  </style>
  <button class='wrapper'>
    <h1 class='name'></h1>
    <p class='message'></p>
    <span class='date'></span>
  </button>
`;

class Dialog extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$message = this.shadowRoot.querySelector('.message');
    this.$date = this.shadowRoot.querySelector('.date');
    this.$name = this.shadowRoot.querySelector('.name');
  }

  set name(value) {
    this.$name.innerHTML = value;
  }

  set message(value) {
    this.$message.innerHTML = value;
  }

  set date(value) {
    this.$date.innerHTML = value;
  }
}

customElements.define('dialog-container', Dialog);
