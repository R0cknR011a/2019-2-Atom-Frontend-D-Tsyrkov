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

        .create_chat {
          background-color: rgb(212, 1, 254);
          position: fixed;
          top: 1000px;
          left: 800px;
        }

        .dialog_container {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
    </style>
    <div class='header'>
        <button class="menu"><img src="https://img.icons8.com/ios-filled/50/000000/menu.png"></button>
        <h1 style="margin-left: 5vw;">Messenger</h1>
        <button class="search"><img src="https://img.icons8.com/android/48/000000/search.png"></button>
    </div>
    <div class='dialog_container'>
    </div>
    <button class='create_chat'><img src="https://cdn3.iconfinder.com/data/icons/othericons-3-0/50/pencil-48.png"></button>
    <form></form>
`;

class MainScreen extends HTMLElement {
  constructor() {
    super();
    this.input_status = false;
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$header = this.shadowRoot.querySelector('.header');
    this.$dialog = this.shadowRoot.querySelector('.dialog_container');
    this.$add_chat = this.shadowRoot.querySelector('.create_chat');
    this.$name_input = this.shadowRoot.querySelector('form');
    this.$route = this.shadowRoot.querySelector('chat-router');

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
        $chat.setAttribute('name', element);
        const arr = JSON.parse(localStorage.getItem(element));
        if (arr.length > 0) {
          $chat.setAttribute('date', arr.slice(-1)[0][1]);
          $chat.setAttribute('message', arr.slice(-1)[0][0]);
        } else {
          $chat.setAttribute('date', '<br>');
          $chat.setAttribute('message', '<br>');
        }
        $chat.addEventListener('click', this.enterDialog.bind(this, element));
        this.$dialog.appendChild($chat);
      });
    }
  }

  onclick() {
    // const $dialog = document.createElement('dialog');
    if (this.input_status) {
      const $input = this.shadowRoot.querySelector('dialog-input');
      $input.remove();
      this.input_status = false;
    } else {
      const $input = document.createElement('dialog-input');
      $input.setAttribute('placeholder', 'Введите имя...');
      this.$name_input.appendChild($input);
      this.input_status = true;
    }
    // $message.setAttribute('message', );
  }

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
        $chat.setAttribute('name', $input.value);
        $chat.setAttribute('date', '<br>');
        $chat.setAttribute('message', '<br>');
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
