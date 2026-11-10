import { html, fixture, expect } from '@open-wc/testing';
import '../src/LoanEMIDetails/LoanEMIDetails.js'
import { stub } from 'sinon';
import { Router} from "@vaadin/router"
import { localize } from "@lion/localize"
import '../localize/inline-data.js';

const emi = {
  interestRate: 7.5,
  monthlyEMI: 1250,
  principal: 100000,
  interest: 5000,
  totalAmount: 105000,
}

describe('Loan EMI details', () => {
  let el

  beforeEach(async()=> {
    localize.locale = 'en-GB'
    localStorage.setItem('emi',JSON.stringify(emi))
    el = await fixture(html`<loanemi-details><loanemi-details/>`)
  })


  afterEach(async()=> {
    localStorage.removeItem('emi')
  })


  it('is define', ()=>{
   expect(el).to.be.instanceOf(customElements.get('loanemi-details'))
  })

  it('check emit data in storage', ()=>{
   expect(el._data).to.deep.equal(emi)
  })

  it('check render heading', async()=>{
   expect(el.shadowRoot.querySelector('h2').textContent).to.equal('EMI details');
  })

  it('check emit data in storage', ()=>{
   expect(el._data).to.deep.equal(emi)
  })

  it('go back to details on cancel', ()=>{
    const go = stub(Router, 'go')
    el.shadowRoot.querySelector('.cancel-btn').click();
    expect(go).to.have.been.calledWith('/details')
    go.restore()
  })

   it('go to customer on continue', ()=>{
    const go = stub(Router, 'go')
    el.shadowRoot.querySelector('.continue-btn').click();
    expect(go).to.have.been.calledWith('/customer')
    go.restore()
  })


});
