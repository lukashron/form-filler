/*
 * This file is part of the Form-filler package.
 *
 * (c) Lukas Hron <info@lukashron.cz>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class FormFiller {
    date;
    formElements = [];

    constructor() {
        this.date = new Date();
    }

    init() {
        console.log('[Form filler] run');

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
                + '<button id="form-filler-action-filler" value="fill">+</button>'
                + '<button id="form-filler-action-sh" value="show">S</button>'
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

                case 'date':
                    // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
                    input.value = this.date.toISOString().split('T')[0];
                    break;

                case 'checkbox':
                    input.checked = true;
                    break;

                case 'number':
                    let rn = (Math.random() * 1000);
                    input.value = Math.floor(rn);
                    break;

                case 'tel':
                    input.value = '+123 505 303 999';
                    break;

                default:
                    input.value = 'Example value ' + Math.floor(Math.random() * 1000);
            }
        }

        console.log('[Form filler] inputs filled');
    }

    cleanInputs() {
        for (let input of this.formElements) {
            input.value = '';

            if (input.checked === true) {
                input.checked = false;
            }
        }

        console.log('[Form filler] inputs cleaned');
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
        .getElementById('form-filler-action-filler')
        .addEventListener('click', function () {
                if (this.value === 'fill') {
                    FormFillerClass.filled();
                    this.value = 'clear';
                    this.innerText = '-';
                } else {
                    FormFillerClass.cleanInputs();
                    this.value = 'fill';
                    this.innerText = '+';
                }
            }
        );

    document
        .getElementById('form-filler-action-sh')
        .addEventListener('click', function () {
                FormFillerClass.showHiddenInputs();
                this.disabled = true;
                this.classList.add('form-filler-disabled');
            }
        );
}