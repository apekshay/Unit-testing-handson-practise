import { html, fixture, expect, aTimeout } from '@open-wc/testing';
import { stub } from 'sinon';
import { Router } from '@vaadin/router';
import { localize } from '@lion/localize';
import '../src/Customer/Customer-details.js';

const field = (el, id) => el.shadowRoot.querySelector(`#${id}`);

function fillValidForm(el) {
  field(el, 'first_name').modelValue = 'Apeksha';
  field(el, 'last_name').modelValue = 'Kumar';
  field(el, 'email').modelValue = 'test@example.com';
  field(el, 'mobile_number').modelValue = '9876543210';
  field(el, 'monthly_salary').modelValue = 50000;
  field(el, 'EMIs_amount').modelValue = 1000;
  el.shadowRoot.querySelector('lion-checkbox').checked = true;
}

describe('customer details', () => {
  let el;
  let go;

  beforeEach(async () => {
    localize.locale = 'en-GB';
    go = stub(Router, 'go');
    el = await fixture(html`<customer-details></customer-details>`);
  });

  afterEach(() => {
    go.restore();
  });

  it('is defined', () => {
    expect(el).to.be.instanceOf(customElements.get('customer-details'));
  });

  it('renders the heading', () => {
    expect(el.shadowRoot.querySelector('h2').textContent).to.equal(
      'Customer Details'
    );
  });

  it('renders all form fields', () => {
    [
      'first_name',
      'last_name',
      'dateof_birth',
      'email',
      'mobile_number',
      'monthly_salary',
      'EMIs_amount',
      'terms',
    ].forEach(id => expect(field(el, id), id).to.exist);
  });

  it('defaults date of birth to 18 years ago', () => {
    const dob = field(el, 'dateof_birth').modelValue;
    expect(dob.getFullYear()).to.equal(new Date().getFullYear() - 18);
  });

  it('first name is invalid when empty', () => {
    expect(field(el, 'first_name').hasFeedbackFor).to.include('error');
  });

  it('first name rejects digits and short names', () => {
    const fn = field(el, 'first_name');
    fn.modelValue = 'ab';
    expect(fn.hasFeedbackFor).to.include('error');
    fn.modelValue = 'abc123';
    expect(fn.hasFeedbackFor).to.include('error');
    fn.modelValue = 'Apeksha';
    expect(fn.hasFeedbackFor).not.to.include('error');
  });

  it('validates the mobile number', () => {
    const mobile = field(el, 'mobile_number');
    mobile.modelValue = '12345';
    expect(mobile.hasFeedbackFor).to.include('error');
    mobile.modelValue = '1234567890';
    expect(mobile.hasFeedbackFor).to.include('error');
    mobile.modelValue = '9876543210';
    expect(mobile.hasFeedbackFor).not.to.include('error');
  });

  it('validates the email', () => {
    const email = field(el, 'email');
    email.modelValue = 'not-an-email';
    expect(email.hasFeedbackFor).to.include('error');
    email.modelValue = 'test@example.com';
    expect(email.hasFeedbackFor).not.to.include('error');
  });

  it('goes back to /emidetails on Back', () => {
    el.shadowRoot.querySelector('.backbg-btn-color').click();
    expect(go).to.have.been.calledWith('/emidetails');
  });

  it('submits a valid form and navigates to /success on 200', async () => {
    const fetchStub = stub(window, 'fetch').resolves({ status: 200 });
    fillValidForm(el);
    el.shadowRoot.querySelector('lion-form').submit();
    await aTimeout(0);

    expect(fetchStub).to.have.been.calledOnce;
    const [url, options] = fetchStub.firstCall.args;
    expect(url).to.contain('/submit-form');
    expect(JSON.parse(options.body).first_name).to.equal('Apeksha');
    expect(go).to.have.been.calledWith('/success');
    fetchStub.restore();
  });
});
