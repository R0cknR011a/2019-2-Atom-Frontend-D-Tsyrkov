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
          // padding: 20px 40px;
          background-color: rgb(212, 1, 254);
          position: relative;
          top: 1200px;
          left: 800px;
        }

        .dialog_container {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid red;
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
`;

class MainScreen extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$header = this.shadowRoot.querySelector('.header');
    this.$dialog = this.shadowRoot.querySelector('.dialog_container');
    this.$add_chat = this.shadowRoot.querySelector('.create_chat');

    this.$add_chat.addEventListener('click', this.onclick.bind(this));
  }

  onclick(event) {
    const $dialog = document.createElement('dialog');
    $message.setAttribute('message');
  }
}

customElements.define('main-screen', MainScreen);
