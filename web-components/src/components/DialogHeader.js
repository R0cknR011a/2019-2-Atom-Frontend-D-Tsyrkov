const template = document.createElement('template');
template.innerHTML = `
    <style>
        .header {
          width: 100%;
          height: 5vh;
          background: rgb(212, 1, 254);
          padding: 2vh;
          display: flex;
          justify-content: space-around;
          align-items: flex-end;
          font-size: 3vh;
          position: fixed;
        }

        .menu {
          outline: none;
          flex-grow: 0;
          width: 5vh;
          height: 5vh;
          margin-left: 1vh;
          background-color: white;
          border-radius: 50%;
        }

        div.menu img {
          width: 65%;
          padding-top: 1vh;
          padding-left: 1vw;
        }

        .search {
          outline: none;
          flex: 2;
          width: 2vh;
          height: 4vh;
          display: flex;
          justify-content: flex-end;
          margin-right: 5vh;
          background: rgb(212, 1, 254);
          border: none;
        }

        .messenger {
          flex: 1;
          flex-grow: 3;
          margin: 1vh;
          padding-left: 2vh;
        }
    </style>
    <div class='header'>
        <div class="menu"><img src="https://img.icons8.com/ios-filled/50/000000/menu.png"></div>
        <div class='messenger'>Messenger</div>
        <div class="search"><img src="https://img.icons8.com/android/48/000000/search.png"></div>
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
