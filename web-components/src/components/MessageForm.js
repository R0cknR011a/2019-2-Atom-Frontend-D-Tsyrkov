const template = document.createElement('template')
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
            <h1>Name</h1>
        </div>
        <div class="result"></div>
        <form-input name="message-text" placeholder="Введите сообщение"></form-input>
    </form>
`

class MessageForm extends HTMLElement {
    constructor () {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(template.content.cloneNode(true))

        this.$form = this._shadowRoot.querySelector('form')
        this.$input = this._shadowRoot.querySelector('form-input')
        this.$result = this._shadowRoot.querySelector('.result')

        this.$form.addEventListener('submit', this._onSubmit.bind(this))
        this.$form.addEventListener('keypress', this._onKeyPress.bind(this))

        for (var i = 0; i < localStorage.length - 1; i++) {
            var $message = document.createElement("message-container")
            var data = localStorage.getItem('message_' + i).split("&")
            $message.setAttribute("message", data[0])
            $message.setAttribute("date", data[1])
            this.$result.appendChild($message)
        }
    }

    _onSubmit (event) {
        event.preventDefault()
        if (this.$input.value.length > 0) {
            var date = new Date()
            var time = date.getHours() + ":" + date.getMinutes()
            localStorage.setItem('message_' + (localStorage.length - 1).toString(), this.$input.value + "&" + time)
            var $message = document.createElement("message-container")
            $message.message = this.$input.value
            $message.date = time
            this.$result.appendChild($message)
            this.$input.value = ""
        }
    }

    _onKeyPress (event) {
        if (event.keyCode == 13) {
            this.$form.dispatchEvent(new Event('submit'))
        }
    }
}

customElements.define('message-form', MessageForm)