const template = document.createElement('template')
template.innerHTML = `
    <style>
        form-input {
            width: 100%;
        }

        .result {
            color: red;
            font-size: 5vw;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            // padding: 2px;
        }

        .result > div {
            // border: 1px solid red;
            margin: 1vh 3vw;
        }

        input[type=submit] {
            visibility: collapse;
        }
    </style>
    <form>
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
            // console.log($message)
            $message.message = data[0]
            $message.date = data[1]
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
