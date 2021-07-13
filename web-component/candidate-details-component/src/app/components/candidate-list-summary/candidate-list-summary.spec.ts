import { CandidateListSummaryComponent } from './candidate-list-summary.component';
describe('Candidate List Component', () => {
    let component;
    beforeEach(() => {
        component = new CandidateListSummaryComponent();
    });

    it('should call loadVariation function to get template variation', async () => {
        expect(component.render().type).toEqual('html');
    });

    it('should call lifecycle method connectedCallback', async () => {
        component.connectedCallback();
        const connectedCallbackdSpy = spyOn(component, 'connectedCallback');
        connectedCallbackdSpy();
        expect(connectedCallbackdSpy).toHaveBeenCalled();
    });
});
