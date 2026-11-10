import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../src/header/Header.js';
import { stub } from 'sinon';
import { localize } from "@lion/localize"
import '../localize/inline-data.js';

describe('loan-header', () => {
  let el

  beforeEach(async()=> {
    localize.locale = 'en-GB'
    el = await fixture(html`<loan-header><loan-header/>`)
  })

  it('is define', ()=>{
   expect(el).to.be.instanceOf(customElements.get('loan-header'))
  })


  it('check render heading', ()=>{
   expect(el.shadowRoot.querySelector('header p').textContent).to.equal('Apply Loan');
  })

  it('check render EN and NL button', ()=>{
   expect(el.shadowRoot.querySelector('en-GB').textContent.trim()).to.equal('EN');
   expect(el.shadowRoot.querySelector('nl-NL').textContent.trim()).to.equal('NL');
  })

  it('has EN selected by default', ()=>{
   const en = el.shadowRoot.getElementById('en-GB')
   const nl = el.shadowRoot.getElementById('nl-NL')
   expect(en).to.have.class('bg-btn-color')
   expect(nl).to.have.class('btn-cursor')
   expect(nl).not.to.have.class('bg-btn-color')
  })


  afterEach(async()=> {
    localize.locale = 'en-GB'
  })

});
