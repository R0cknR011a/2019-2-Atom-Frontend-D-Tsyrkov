const template = document.createElement('template');
template.innerHTML = `
    <style></style>
    <div class='router'></div>
`;

class Router extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$router = this.shadowRoot.querySelector('.router');
  }

  connectedCallback() {
    const $mainscreen = document.createElement('main-screen');
    $mainscreen.enter = (name) => {
      $mainscreen.remove();
      const $chat = document.createElement('message-form');
      $chat.setAttribute('name', name);
      $chat.exit = () => {
        $chat.remove();
        this.connectedCallback();
      };
      this.$router.appendChild($chat);
    };
    this.$router.appendChild($mainscreen);
  }
}

customElements.define('chat-router', Router);
