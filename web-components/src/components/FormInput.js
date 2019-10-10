const template = document.createElement('template')
template.innerHTML = `
    <style>
        input {
            border: 0;
            border-top: 5px solid silver;
            outline: none;
            width: 100%;
            height: 130px;
            font-size: 60px;
            padding: 25px 50px;
            margin: 0;
            position: fixed;
            bottom: 0;
        }

        :host {
            display: inline-block;
        }
        
    </style>
    <input type="text">
`

class FormInput extends HTMLElement {
    constructor () {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(template.content.cloneNode(true))

        this.$input = this._shadowRoot.querySelector('input')
    }

    static get observedAttributes() {
        return ['name', 'value', 'placeholder', 'disabled']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.$input.setAttribute(name, newValue)
    }

    get value() {
        return this.$input.value
    }

    set value(newValue) {
        this.$input.value = newValue
    }
}

customElements.define('form-input', FormInput)
