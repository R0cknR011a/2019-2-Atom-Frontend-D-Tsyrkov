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
            margin-top: 220px;
            margin-bottom: 80px;
        }

        input[type=submit] {
            visibility: collapse;
        }

        .header {
            background: rgb(212, 1, 254);
            height: 250px;
            width: 100%;
            position: fixed;
            top: 0;
            text-align: center;
        }

    </style>
    <form>
        <div class="header">
            <h1>User name</h1>
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

    this.$form.addEventListener('submit', this.onSubmit.bind(this));
    this.$form.addEventListener('keypress', this.onKeyPress.bind(this));

    const data = localStorage.getItem('messages');
    if (data === null) {
      localStorage.setItem('messages', JSON.stringify([]));
    } else {
      JSON.parse(data).forEach((element) => {
        const $message = document.createElement('message-container');
        $message.setAttribute('message', element[0]);
        $message.setAttribute('date', element[1]);
        this.$result.appendChild($message);
      });
    }
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
      const data = JSON.parse(localStorage.getItem('messages'));
      data.push([this.$input.value, time]);
      localStorage.setItem('messages', JSON.stringify(data));
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
}

customElements.define('message-form', MessageForm);
