import { html, fixture, expect } from '@open-wc/testing';

import '../loan-application.js';

describe('LoanApplication', () => {
  let el

  beforeEach(async()=> {
    localize.locale = 'en-GB'
    el = await fixture(html`<loan-application><loan-application/>`)
  })


  it('is define', ()=>{
   expect(el).to.be.instanceOf(customElements.get('loan-application'))
  })

  it('check props', ()=>{
   expect(el.title).to.equal('Hey there')
   expect(el.counter).to.equal(5)
  })

  it('check __increment', ()=>{
   expect(el.counter).to.equal(5)
   el.__increment()
   expect(el.counter).to.equal(6)
  })

  it('check title as props', async()=>{
   expect(el.title).to.equal('Hey there')
   const custom = await fixture(html`<loan-application title='My Loan'><loan-application/>`)
   expect(el.title).to.equal('My Loan')
  })

  it('check render dashboard', async()=>{
   expect(el.shadowRoot.querySelector('dash-board')).to.exist;
  })

});
