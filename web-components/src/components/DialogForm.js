const template = document.createElement('template');
template.innerHTML = `
  <style>
    .create_chat {
      background-color: rgb(212, 1, 254);
      position: fixed;
      top: 90vh;
      left: 90vw;
    }

    .dialog_container {
      width: 100%;
      background: #ebdddd;
      padding-top: 9vh;
      display: flex;
      flex-direction: column-reverse;
    }
    </style>
    <dialog-header></dialog-header>
    <div class='dialog_container'></div>
    <button class='create_chat'><img src="https://cdn3.iconfinder.com/data/icons/othericons-3-0/50/pencil-48.png"></button>
    <form></form>
`;

class MainScreen extends HTMLElement {
  constructor() {
    super();
    this.input_status = false;
    this.old_sort = [];
    this.current_sort = [];
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$dialog = this.shadowRoot.querySelector('.dialog_container');
    this.$add_chat = this.shadowRoot.querySelector('.create_chat');
    this.$name_input = this.shadowRoot.querySelector('form');
    this.$search = this.shadowRoot.querySelector('dialog-header');

    this.$add_chat.addEventListener('click', this.onclick.bind(this));
    this.$name_input.addEventListener('submit', this.onSubmit.bind(this));
    this.$name_input.addEventListener('keypress', this.onKeyPress.bind(this));
  }

  connectedCallback() {
    const data = localStorage.getItem('users');
    if (data === null) {
      localStorage.setItem('users', JSON.stringify([]));
    } else {
      JSON.parse(data).forEach((element) => {
        const $chat = document.createElement('dialog-container');
        $chat.name = element;
        const arr = JSON.parse(localStorage.getItem(element));
        if (arr.length > 0) {
          // eslint-disable-next-line prefer-destructuring
          [$chat.message, $chat.date] = arr.slice(-1)[0];
          $chat.check = '&#10003';
        } else {
          $chat.date = '';
          $chat.message = '';
        }
        $chat.addEventListener('click', this.enterDialog.bind(this, element));
        this.$dialog.appendChild($chat);
      });
    }
    this.$search.find = (name) => {
      this.setAttribute('name', name);
    };
  }

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.arr = [];
    JSON.parse(localStorage.getItem('users')).forEach((element) => {
      if (element.slice(0, newValue.length) === newValue) {
        this.arr.push(element);
      }
    });
    this.$dialog.innerHTML = '';
    this.arr.forEach((element) => {
      const $chat = document.createElement('dialog-container');
      $chat.name = element;
      const arr = JSON.parse(localStorage.getItem(element));
      if (arr.length > 0) {
        // eslint-disable-next-line prefer-destructuring
        [$chat.message, $chat.date] = arr.slice(-1)[0];
        $chat.check = '&#10003';
      } else {
        $chat.date = '';
        $chat.message = '';
      }
      $chat.addEventListener('click', this.enterDialog.bind(this, element));
      this.$dialog.appendChild($chat);
    });
  }

  onclick() {
    if (this.input_status) {
      const $input = this.shadowRoot.querySelector('dialog-input');
      $input.remove();
      this.input_status = false;
    } else {
      const $input = document.createElement('dialog-input');
      this.$name_input.appendChild($input);
      this.input_status = true;
    }
  }

  // search() {
  //   PaymentAddress;
  // }

  onSubmit(event) {
    event.preventDefault();
    const $input = this.shadowRoot.querySelector('dialog-input');
    if ($input.value !== '') {
      const data = JSON.parse(localStorage.getItem('users'));
      if (data.includes($input.value)) {
        alert('Данный диалог уже существует');
      } else {
        data.push($input.value);
        localStorage.setItem('users', JSON.stringify(data));
        localStorage.setItem($input.value, JSON.stringify([]));
        const $chat = document.createElement('dialog-container');
        $chat.name = $input.value;
        $chat.date = '';
        $chat.message = '';
        $chat.addEventListener('click', this.enterDialog.bind(this, $input.value));
        this.$dialog.appendChild($chat);
        $input.value = '';
      }
    } else {
      alert('Введите название диалога');
    }
  }

  onKeyPress(event) {
    if (event.keyCode === 13) {
      this.$name_input.dispatchEvent(new Event('submit'));
    }
  }

  set enter(value) {
    this.enterDialog = value;
  }
}

customElements.define('main-screen', MainScreen);
