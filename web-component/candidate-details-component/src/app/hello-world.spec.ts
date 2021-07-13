import { HelloWorldComponent } from './hello-world.component';
describe('Hello World Component', () => {
    let component;
    beforeEach(() => {
        component = new HelloWorldComponent();
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
