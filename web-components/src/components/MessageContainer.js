const template = document.createElement('template');
template.innerHTML = `
    <style>
        .message {
            font-size: 50px;
            font-family: Segoe UI;
            overflow-wrap: break-word;
            white-space: pre-wrap;
            line-height: 45px;
        }

        .date {
            display: inline-block;
            font-size: 30px;
            font-style: italic;
        }

        .wrapper {
            background: rgb(247, 182, 254);
            border-radius: 15px;
            width: auto;
            padding: 15px;
            margin-bottom: 50px;
            max-width: 700px;
        }
    </style>
    <div class="wrapper">
        <p class="message"></p>
        <span class="date"></span>
    </div>
`;

class MessageContainer extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$message = this.shadowRoot.querySelector('.message');
    this.$date = this.shadowRoot.querySelector('.date');
  }

  set message(value) {
    this.$message.innerHTML = value;
  }

  set date(value) {
    this.$date.innerHTML = value;
  }
}

customElements.define('message-container', MessageContainer);
