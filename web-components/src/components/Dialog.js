const template = document.createElement('template');
template.innerHTML = `
  <style>
  </style>
  <div class='wrapper'>
    <h1 class='name'></h1>
    <p class='message'></p>
    <span class='date'></span>
  </div>
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

  static get observedAttributes() {
    return ['message', 'date', 'name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'message':
        this.$message.innerHTML = newValue;
        break;
      case 'date':
        this.$date.innerHTML = newValue;
        break;
      case 'name':
        this.$name.innerHTML = newValue;
        break;
      default:
        break;
    }
  }
}

customElements.define('dialog', Dialog);
