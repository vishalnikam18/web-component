/**
 *
 * These are templates for Hello World Component
 *
 * @packageDocumentation
 * @module Templates
 */

import { html } from 'lit-element';
import { AccessibilityDirective } from '../../shared/directives/accessibility.directive';

export function stockTemplate() {
    return html`
        <div class="container-fluid stock-template-wrapper">
            <div class="row">
                <div class="col-12 text-center p-15">
                    <img
                        class="logo"
                        src="https://static-tx.travelclick.com/p1/chain/AAM/media/menubar/brand-logo/tc_amadeus_logo_314x81.png"
                    />
                    <h3
                        class="template-title"
                        tabindex="0"
                        aria-label="Template Heading"
                        role="heading"
                        @AccessibilityDirective=${AccessibilityDirective()}
                    >
                        This is template 1
                    </h3>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-6">
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Second</th>
                                <th scope="col">Last</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td
                                    tabindex="0"
                                    role="cell"
                                    aria-label="One Column"
                                    @AccessibilityDirective=${AccessibilityDirective(this.clickHandlerForColumn)}
                                    @click=${this.clickHandlerForColumn}
                                >
                                    One
                                </td>
                                <td>Two</td>
                                <td>Three</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row justify-content-center">
                <button @click=${this.clickHandler} type="button" class="btn btn-primary btn-book m-10">
                    ${this.bookNowText}
                </button>
            </div>
        </div>
    `;
}
