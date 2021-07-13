//https://docs.cypress.io/api/commands/viewport.html#Arguments
const sizes = [
    'ipad-2',
    'iphone-5',
    ['iphone-5', 'landscape']
  ];

describe('Test Hello World Component', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })

    sizes.forEach((size) => {

        //Check if component exist in dom
        it(size + ' Custom Element exists', () => {
            cy.setResolution(size);
            expect(cy.get("amadeus-hos-res-wc-hello-world")).to.exist;
        })

        //Check if button click works
        it(size + ' Click Button', () => {
            cy.setResolution(size);
            cy.get('amadeus-hos-res-wc-hello-world').shadow().find('.btn').click();
            cy.get('amadeus-hos-res-wc-hello-world').shadow().find('.btn').click();
            cy.get('amadeus-hos-res-wc-hello-world').shadow().find('.btn').click();
            cy.get('amadeus-hos-res-wc-counter').shadow().find('.count').should('have.text', 'Book Now Button Clicked : 3');
        })
         //Check if attribute sets correctly
        it(size + ' Set Attrubute Works', () => {
            cy.setResolution(size);
            cy.get('amadeus-hos-res-wc-hello-world').then(function (el) {
                el[0].setAttribute('templateId', 'template-2')
            })
            .should('have.attr', 'templateId', 'template-2');

        })
        // Check if template loads according to attribute passed
        it(size + 'Template 2 is loaded', () => {
              cy.setResolution(size);
              cy.get('amadeus-hos-res-wc-hello-world').then(function (el) {
                        el[0].setAttribute('templateId', 'template-2')
                })
                .shadow()
                .find('.template-2')
                .should('have.class', 'template-2');

        })

        //Checks if element loads on viewport
        it(size + ' display of Button above the fold', () => {
            cy.setResolution(size);
            cy.get('amadeus-hos-res-wc-hello-world').should(e => {
                const [dom] = e.get();

                let bottom = Cypress.$( cy.state("window") ).height();
                const rect = dom.shadowRoot.querySelector('.btn').getBoundingClientRect();

                expect( rect.top ).to.be.lessThan( bottom );
                expect( rect.bottom ).to.be.lessThan( bottom );

                //cypress's visibility calculations to take into account elements outside of the viewport.
                //an element is considered visible if the user in could in any way interact with it - even if they needed to scroll to it.
                //following will pass
                //expect(dom.shadowRoot.querySelector('.btn-book-now')).to.be.visible;
                });
        })

    });

})