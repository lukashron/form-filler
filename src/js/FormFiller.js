class FormFiller
{
    formElements;

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
                + '<button id="form-filler-action-filled">F</button>'
                + '<button id="form-filler-action-clear">C</button>'
            + '</div>');
    }

    /**
     * Filler
     */

    searchElements() {
        this.formElements = document.querySelectorAll('input, textarea');
    }

    filled() {
        for (let input of this.formElements) {
            switch (input.type) {
                case 'textarea':
                    this.setElementValueWhenEmpty(
                        input,
                        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas libero.'
                    );
                    break;

                case 'email':
                    this.setElementValueWhenEmpty(
                        input,
                        'test@example.domain'
                    );
                    break;

                case 'checkbox':
                    input.checked = true;
                    break;

                case 'hidden':
                    console.log('Hidden input: "' + input.name + '": "' + input.value + '');

                    // View hidden inputs
                    // input.setAttribute('type','text');
                    break;

                default:
                    this.setElementValueWhenEmpty(
                        input,
                        'Example value ' + Math.floor(Math.random() * 1000)
                    );
            }
        }
    }

    setElementValueWhenEmpty(element, value) {
        if (element.value === '') {
            element.value = value;
        }
    }

    cleanInputs() {
        for (let input of this.formElements) {
            input.value = '';
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
}