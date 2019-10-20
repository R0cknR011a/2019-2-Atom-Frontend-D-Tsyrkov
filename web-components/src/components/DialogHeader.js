const template = document.createElement('template');
template.innerHTML = `
    <style>
        .header {
            background-color: rgb(212, 1, 254);
            width: 100vw;
            height: 7vh;
            display: grid;
            grid-template-columns: 10vw 80vw 10vw;
            font-size: 30px;
            // border: 1px solid red;
        }

        .menu {
            background-color: rgb(212, 1, 254);
            border: none;
            outline: none;
        }

        .search {
            background-color: rgb(212, 1, 254);
            outline: none;
            border: none;
        }
    </style>
    <div class='header'>
        <button class="menu"><img src="https://img.icons8.com/ios-filled/50/000000/menu.png"></button>
        <h1 style="margin-left: 5vw;">Messenger</h1>
        <button class="search"><img src="https://img.icons8.com/android/48/000000/search.png"></button>
    </div>
    <form></form>
`;

class DialogHeader extends HTMLElement {
  constructor() {
    super();
    this.input_status = false;
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$header = this.shadowRoot.querySelector('.header');
    this.$search = this.shadowRoot.querySelector('.search');
    this.$form = this.shadowRoot.querySelector('form');

    this.$search.addEventListener('click', this.onclick.bind(this));
  }

  connectedCallback() {
    this.$form.addEventListener('keydown', this.onKeyPress.bind(this));
  }

  onclick() {
    if (this.input_status) {
      const $input = this.shadowRoot.querySelector('search-input');
      $input.remove();
      this.input_status = false;
    } else {
      const $input = document.createElement('search-input');
      this.$form.appendChild($input);
      this.input_status = true;
    }
  }

  onKeyPress(event) {
    let input = this.shadowRoot.querySelector('search-input').value;
    if (event.key === 'Backspace') {
      input = input.slice(0, -1);
      this.find(input);
    } else {
      this.find(input + event.key);
    }
  }
}

customElements.define('dialog-header', DialogHeader);
