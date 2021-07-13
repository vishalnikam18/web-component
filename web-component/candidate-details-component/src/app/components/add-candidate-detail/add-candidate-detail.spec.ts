import { AddCandidateDetailComponent } from './add-candidate-detail.component';
describe('Candidate List Component', () => {
    let component;
    beforeEach(() => {
        component = new AddCandidateDetailComponent();
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
