const template = document.createElement('template');
template.innerHTML = `
  <style>
    .wrapper {
      width: 100%;
      height: 10vh;
      background: rgb(254, 230, 254);
      border-bottom: 0.5vh solid rgb(212, 1, 254);
      font-size: 2vh;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    img {
      width: 6vh;
      height: 6vh;
      display: block;
      flex: 0;
      border-radius: 50%;
      background: #fff;
      margin-left: 2vh;
    }

    .name-message {
      line-height: 20px;
      margin: 0;
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding-left: 3vw;
    }

    .name {
      margin: 0;
      font-weight: bold;
      font-size: 3vh;
      padding: 1vh 0 2vh 0;
    }

    .message {
      font-size: 2.5vh;
      margin: 0;
      max-width: 6vh;
      word-wrap: normal;
      white-space: nowrap;
    }

    .date {
      display: block;
      margin: 0;
    }

    .read {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: flex-end;
      padding-right: 2vh;
    }

    .check {
      padding-top: 2vh;
    }
  </style>
  <div class='wrapper'>
    <div class="avatar"><img src='http://s1.iconbird.com/ico/2013/3/636/w80h80139396728710.png'></div>
    <div class='name-message'>
      <p class='name'></p>
      <p class='message'></p>
    </div>
    <div class='read'>
      <span class='date'></span>
      <span class='check'</span>
  </div>
`;

class Dialog extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.$message = this.shadowRoot.querySelector('.message');
    this.$date = this.shadowRoot.querySelector('.date');
    this.$name = this.shadowRoot.querySelector('.name');
    this.$check = this.shadowRoot.querySelector('.check');
  }

  set name(value) {
    this.$name.innerHTML = value;
  }

  set message(value) {
    this.$message.innerHTML = value;
  }

  set date(value) {
    this.$date.innerHTML = value;
  }

  set check(value) {
    this.$check.innerHTML = value;
  }
}

customElements.define('dialog-container', Dialog);
