import { customElement, LitElement, html } from 'lit-element';
import { AccessibilityDirective } from './accessibility.directive';

let count = 0;

describe('Accessibility Directive', () => {
    beforeAll(() => {
        function increaseCount() {
            count = count + 1;
        }
        @customElement('amadeus-hos-res-wc-accessibility-mock-component')
        class AccessibilityMockComponent extends LitElement {
            mockFunction() {
                return null;
            }

            render() {
                return html`
            <div id="test-id-1" tabindex="0" @AccessibilityDirective=${AccessibilityDirective(increaseCount)}></div>
            <div id="test-id-2" tabindex="0" @AccessibilityDirective=${AccessibilityDirective(increaseCount)}></div>
            <div id="test-id-3" tabindex="0" @AccessibilityDirective=${AccessibilityDirective(increaseCount)}></div>
            <div id="test-id-4" tabindex="0" @AccessibilityDirective=${AccessibilityDirective(increaseCount)}></div>
        `;
            }
        }
        spyOn(new AccessibilityMockComponent(), 'mockFunction').and.returnValue(null);
    });

    it('should execute the callback function on keypress enter', async (done) => {
        const element = document.createElement('amadeus-hos-res-wc-accessibility-mock-component');
        document.body.appendChild(element);
        await customElements.whenDefined('amadeus-hos-res-wc-accessibility-mock-component');
        const testElement = document.querySelector('amadeus-hos-res-wc-accessibility-mock-component')
            .shadowRoot.getElementById('test-id-4');
        const options: any = { 'keyCode': 13 };
        testElement.dispatchEvent(new KeyboardEvent('keydown', options));
        setTimeout(() => {
            expect(count).toEqual(1);
            testElement.remove();
            done();
        });
    });

    it('should set the amadeus-hos-res-cn-add-accessibility-focus class on focus', async (done) => {
        const element = document.createElement('amadeus-hos-res-wc-accessibility-mock-component');
        document.body.appendChild(element);
        await customElements.whenDefined('amadeus-hos-res-wc-accessibility-mock-component');
        const testElement = document.querySelector('amadeus-hos-res-wc-accessibility-mock-component')
            .shadowRoot.getElementById('test-id-1');
        testElement.focus();
        setTimeout(() => {
            expect(testElement.classList.length).toEqual(1);
            testElement.remove();
            done();
        });
    });

    it('should remove the amadeus-hos-res-cn-add-accessibility-focus class on blur', async (done) => {
        const element = document.createElement('amadeus-hos-res-wc-accessibility-mock-component');
        document.body.appendChild(element);
        await customElements.whenDefined('amadeus-hos-res-wc-accessibility-mock-component');
        const testElement = document.querySelector('amadeus-hos-res-wc-accessibility-mock-component')
            .shadowRoot.getElementById('test-id-2');
        testElement.focus();
        setTimeout(() => {
            expect(testElement.classList.length).toEqual(1);
            testElement.blur();
            setTimeout(() => {
                expect(testElement.classList.length).toEqual(0);
                testElement.remove();
                done();
            });
        });
    });

    it('should remove the amadeus-hos-res-cn-add-accessibility-focus class on mousedown', async (done) => {
        const element = document.createElement('amadeus-hos-res-wc-accessibility-mock-component');
        document.body.appendChild(element);
        await customElements.whenDefined('amadeus-hos-res-wc-accessibility-mock-component');
        const testElement = document.querySelector('amadeus-hos-res-wc-accessibility-mock-component')
            .shadowRoot.getElementById('test-id-3');
        testElement.focus();
        setTimeout(() => {
            expect(testElement.classList.length).toEqual(1);
            const mousedownEvent = document.createEvent('MouseEvents');
            mousedownEvent.initEvent('mousedown', true, false);
            testElement.dispatchEvent(mousedownEvent);
            setTimeout(() => {
                expect(testElement.classList.length).toEqual(0);
                testElement.remove();
                done();
            });
        });
    });
});
