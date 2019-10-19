const template = document.createElement('template');
template.innerHTML = `
    <style>
        form-input {
            width: auto;
        }
        .result {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            padding: 50px;
            overflow: hidden;
            margin-top: 80px;
            margin-bottom: 80px;
        }
        input[type=submit] {
            visibility: collapse;
        }
        .header {
            background: rgb(212, 1, 254);
            height: 7vh;
            font-size: 30px;
            width: 100vw;
            position: fixed;
            top: 0;
            display: grid;
            grid-template-columns: 10vw 90vw;
        }
        .exit {
          background-color: rgb(212, 1, 254);
        }
    </style>
    <form>
        <div class="header">
            <button class='exit'><img src="https://img.icons8.com/material-two-tone/48/000000/left.png"></button>
            <h1 class="name"></h1>
        </div>
        <div class="result"></div>
        <form-input name="message-text" placeholder="Введите сообщение"></form-input>
    </form>
`;

class MessageForm extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$form = this.shadowRoot.querySelector('form');
    this.$input = this.shadowRoot.querySelector('form-input');
    this.$result = this.shadowRoot.querySelector('.result');
    this.$name = this.shadowRoot.querySelector('.name');
    this.$exit = this.shadowRoot.querySelector('.exit');

    this.$form.addEventListener('submit', this.onSubmit.bind(this));
    this.$form.addEventListener('keypress', this.onKeyPress.bind(this));
  }

  connectedCallback() {
    JSON.parse(localStorage.getItem(this.getAttribute('name'))).forEach((element) => {
      const $message = document.createElement('message-container');
      [$message.message, $message.date] = element;
      this.$result.appendChild($message);
    });
    this.$exit.addEventListener('click', this.exitToMain.bind(this));
  }

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.$name.innerHTML = newValue;
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.$input.value.length > 0) {
      const date = new Date();
      let minutes = date.getMinutes().toString();
      if (minutes.length < 2) {
        minutes = `0${minutes}`;
      }
      let hours = date.getHours().toString();
      if (hours.length < 2) {
        hours = `0${hours}`;
      }
      const time = `${hours}:${minutes}`;
      const data = JSON.parse(localStorage.getItem(this.getAttribute('name')));
      data.push([this.$input.value, time]);
      localStorage.setItem(this.getAttribute('name'), JSON.stringify(data));
      const $message = document.createElement('message-container');
      $message.message = this.$input.value;
      $message.date = time;
      this.$result.appendChild($message);
      this.$input.value = '';
      window.scrollTo(0, document.body.scrollHeight);
    }
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
      this.$form.dispatchEvent(new Event('submit'));
    }
  }

  set exit(value) {
    this.exitToMain = value;
  }
}

customElements.define('message-form', MessageForm);
