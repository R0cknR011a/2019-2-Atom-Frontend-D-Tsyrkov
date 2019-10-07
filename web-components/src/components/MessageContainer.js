const template = document.createElement('template')
template.innerHTML = `
    <style>
        div {
            color: red
        }
    </style>
    <div>
        <p class="message"></p>
        <span class="date"></span>
    </div>
`

class MessageContainer extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(template.content.cloneNode(true))

        this.$message = this._shadowRoot.querySelector(".message")
        this.$date = this._shadowRoot.querySelector(".date")
    }

    static get observedAttributes() {
        return ["message", "date"]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("here")
        switch(name) {
            case "message":
                this.$message.setAttribute(name, newValue)
                break;
            case "date":
                this.$date.setAttribute(name, newValue)
                break;
        }
    }

    get message() {
        return this.$message.value
    }

    set message(newValue) {
        this.$message.innerHTML = newValue
    }

    get date() {
        return this.$date.value
    }

    set date(newValue) {
        this.$date.innerHTML = newValue
    }
}

customElements.define('message-container', MessageContainer)