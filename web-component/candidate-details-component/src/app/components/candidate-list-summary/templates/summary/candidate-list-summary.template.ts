/**
 *
 * These are templates for Interview Summary Component
 *
 * @packageDocumentation
 * @module Templates
 */

import { html } from 'lit-element';


export function candidateListSummaryTemplate() {
    return html`
    <div class='outer col-sm-12'>
        <div class='overall col-sm-4'>
            <span>Total Interviewed</span> <span class='rightSide'>${this.candidateListSummary.length}</span><br>
            <span>Total Selected </span> <span class='rightSide'>${this.overallSelectedCount}</span><br>
            <span>Total Rejected </span> <span class='rightSide'>${this.overallRejectedCount}</span><br>
        </div>
        <div class='selected col-sm-4'>
            <span>Total External Interview</span> <span class='rightSide'>${this.externalInterviewCount}</span><br>
            <span>Total Selected</span> <span class='rightSide'>${this.externalSelectedCount}</span><br>
            <span>Total Rejected</span> <span class='rightSide'>${this.externalRejectedCount}</span><br>
        </div>
        <div class='rejected col-sm-3'>
            <span>Total Internal Interview</span> <span class='rightSide'>${this.internalInterviewCount}</span><br>
            <span>Total Selected</span> <span class='rightSide'>${this.internalSelectedCount}</span><br>
            <span>Total Rejected</span> <span class='rightSide'>${this.internalRejectedCount}</span><br>
        </div>
    </div>
    `;

}

