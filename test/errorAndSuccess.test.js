import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import { Router} from "@vaadin/router"
import { localize } from "@lion/localize"
import '../localize/inline-data.js';
import '../src/SuccessAndError/Success.js';
import '../src/SuccessAndError/Error.js';

describe('Success screen ', () => {
 let el
beforeEach(async()=> {
  localize.locale = 'en-GB'
  el = await fixture(html`<loan-success><loan-success/>`)
})

it('is define', ()=>{
expect(el).to.be.instanceOf(customElements.get('loan-success'))
})



it('h2 text context', ()=>{
expect(el.shadowRoot.querySelector('h2').textContent).to.equal(
  'Congratulations!!'
)});




it('p text context', ()=>{
expect(el.shadowRoot.querySelector('h2').textContent).to.equal(
  'submitted successfully'
)});


it('Onclick on home btn', ()=>{
  const go = stub(Router, 'go')
el.shadowRoot.querySelector('.home-btn').click()
expect(go).to.have.been.calledWith(
  '/'
)
go.restore()
});


});




describe('error screen', () => {
  // Write test cases inside this block
 let el
beforeEach(async()=> {
  localize.locale = 'en-GB'
  el = await fixture(html`<loan-error><loan-error/>`)
})

it('is define', ()=>{
expect(el).to.be.instanceOf(customElements.get('loan-erorr'))
})



it('h2 text context', ()=>{
expect(el.shadowRoot.querySelector('h2').textContent).to.equal(
  'Oops!!'
)});




it('p text context', ()=>{
expect(el.shadowRoot.querySelector('h2').textContent).to.equal(
  'not successfully'
)});

it('Onclick on home btn', ()=>{
  const go = stub(Router, 'go')
el.shadowRoot.querySelector('.home-btn').click()
expect(go).to.have.been.calledWith(
  '/'
)
go.restore()
});


});
