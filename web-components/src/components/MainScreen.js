const template = document.createElement('template');
template.innerHTML = `
    <style>
        .header {
            background-color: rgb(212, 1, 254);
            width: 100vw;
            // border :1px solid red;
        }
    </style>
    <div class='header'>
        <button class='menu'></button>
        <h1>Messenger</h1>
        <i class="large material-icons">insert_chart</i>
        <button class='search'></button>
    </div>
    <div class='dialog_container'>
    </div>
    <button class='create_chat'></button>
`;

class MainScreen extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$header = this.shadowRoot.querySelector('.header');
    this.$dialog = this.shadowRoot.querySelector('.dialog_container');
  }
}

customElements.define('main-screen', MainScreen);
