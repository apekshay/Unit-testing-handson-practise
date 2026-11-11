import { html, fixture, expect, aTimeout } from '@open-wc/testing';
import { stub } from 'sinon';
import { Router } from '@vaadin/router';
import { localize } from '@lion/localize';
import '../locale/inline-data.js';
import '../src/LoanBasicDetails/BasicDetails.js';

describe('Basic details', () => {
  let el;
  let go;

  beforeEach(async () => {
    localize.locale = 'en-GB';
    localStorage.setItem('type', 'Home Loan');
    go = stub(Router, 'go');
    el = await fixture(html`<basic-details></basic-details>`);
  });

  afterEach(() => {
    go.restore();
    localStorage.removeItem('type');
    localStorage.removeItem('emi');
  });

  it('is defined', () => {
    expect(el).to.be.instanceOf(customElements.get('basic-details'));
  });

  it('has default values', () => {
    expect(el.amount).to.equal(10000);
    expect(el.range).to.equal(2);
    expect(el.emiCalc).to.equal(0);
  });

  it('reads loan type from localStorage', () => {
    expect(el.type).to.equal('Home Loan');
    expect(el.shadowRoot.querySelector('.type').value).to.equal('Home Loan');
  });

  it('renders the heading', () => {
    expect(el.shadowRoot.querySelector('h2').textContent).to.equal(
      'Loan Details'
    );
  });

  it('has a disabled type field', () => {
    expect(el.shadowRoot.querySelector('.type').hasAttribute('disabled')).to.be
      .true;
  });

  it('renders amount and period fields with defaults', () => {
    expect(el.shadowRoot.querySelector('.amount').modelValue).to.equal(10000);
    expect(el.shadowRoot.querySelector('.period').modelValue).to.equal(2);
  });

  it('shows the amount in words on keyup', async () => {
    const amount = el.shadowRoot.querySelector('.amount');
    amount.modelValue = 25000;
    await amount.updateComplete;
    amount.dispatchEvent(new KeyboardEvent('keyup'));
    expect(el.shadowRoot.querySelector('#word').textContent).to.contain(
      'twenty five thousand'
    );
  });

  it('navigates to dashboard on Previous', () => {
    el.shadowRoot.querySelector('.btn-previous').click();
    expect(go).to.have.been.calledWith('/');
  });

  it('does not call the API and highlights amount when below 10000', async () => {
    const fetchStub = stub(window, 'fetch');
    const amount = el.shadowRoot.querySelector('.amount');
    amount.modelValue = 5000;
    await amount.updateComplete;

    el.shadowRoot.querySelector('.btn-next').click();

    expect(fetchStub).not.to.have.been.called;
    expect(amount).to.have.class('e-handle');
    fetchStub.restore();
  });
});
