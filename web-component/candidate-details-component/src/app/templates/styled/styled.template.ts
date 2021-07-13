/**
 * @packageDocumentation
 * @module Templates
 */
import { html } from 'lit-element';

export function styledTemplate() {
    return html`
        <div class="template-2 container-fluid stock-template-wrapper p-15">
            <h3 class="text-center">
                This is template 2
            </h3>
            <div class="row form-group p-2">
                <div class="col">
                    One
                </div>
            </div>
            <hr />
            <div class="row form-group p-2">
                <div class="col">Two</div>
            </div>
            <hr />
            <div class="row form-group p-2">
                <div class="col">Three</div>
            </div>
        </div>
    `;
}
