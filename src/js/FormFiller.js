class FormFiller {
    formElements = [];

    init() {
        console.log('Form filler run');

        this.renderPanel();
        this.searchElements();

        // Auto-fill on load
        // this.filled();
    }

    /**
     * Panel
     */
    renderPanel() {
        document.body.insertAdjacentHTML(
            'beforeend',
            '<div id="form-filler-panel">'
                + '<button id="form-filler-action-filled">+</button>'
                + '<button id="form-filler-action-clear">-</button>'
                + '<button id="form-filler-action-sh">H</button>'
            + '</div>');
    }

    /**
     * Filler
     */

    searchElements() {
        for (let input of document.querySelectorAll('input, textarea')) {
            if (! input.value.length > 0 || input.type === 'checkbox') {
                this.formElements.push(input);
            }
        }
    }

    filled() {
        for (let input of this.formElements) {
            switch (input.type) {
                case 'textarea':
                    input.value = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas libero.';
                    break;

                case 'email':
                    input.value = 'test@example.domain';
                    break;

                case 'checkbox':
                    input.checked = true;
                    break;

                default:
                    input.value = 'Example value ' + Math.floor(Math.random() * 1000);
            }
        }
    }

    cleanInputs() {
        for (let input of this.formElements) {
            input.value = '';

            if (input.checked === true) {
                input.checked = false;
            }
        }
    }

    showHiddenInputs() {
        for (let input of document.querySelectorAll('input[type="hidden"]')) {
            console.log('Hidden input: "' + input.name + '": "' + input.value + '');
            input.insertAdjacentHTML('beforebegin', '<br/>' + input.name + ' ');
            input.insertAdjacentHTML('afterbegin', '<br/>');
            input.setAttribute('type', 'text');
        }
    }
}

window.onload = function WindowLoad(event) {
    let FormFillerClass = new FormFiller();
    FormFillerClass.init();

    document
        .getElementById('form-filler-action-clear')
        .addEventListener('click', function () {
                FormFillerClass.cleanInputs();
            }
        );

    document
        .getElementById('form-filler-action-filled')
        .addEventListener('click', function () {
                FormFillerClass.filled();
            }
        );

    document
        .getElementById('form-filler-action-sh')
        .addEventListener('click', function () {
                FormFillerClass.showHiddenInputs();
            }
        );
}