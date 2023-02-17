const { OnePayDomestic } = require('vn-payments');
const { OnePayInternational } = require('vn-payments');
const { VNPay } = require('vn-payments');
const { SohaPay } = require('vn-payments');
const { NganLuong } = require('vn-payments');

const onepayIntl = new OnePayInternational({
    paymentGateway: 'https://mtf.onepay.vn/vpcpay/vpcpay.op',
    merchant: 'TESTONEPAY',
    accessCode: '6BEB2546',
    secureSecret: '6D0870CDE5F24F34F3915FB0045120DB',
  });

  routes.post('/payment/checkout', (req, res) => {
    const params = Object.assign({}, req.body);
   
    // construct checkout payload from form data and app's defaults
    const checkoutData = {
      amount: parseInt(params.amount, 10),
      customerId: params.email,
      currency: 'VND',
      /*...*/
    };
   
    // buildCheckoutUrl is async operation and will return a Promise
    onepayIntl
      .buildCheckoutUrl(checkoutData)
      .then(checkoutUrl => {
        res.writeHead(301, { Location: checkoutUrl.href });
        res.end();
      })
      .catch(err => {
        res.send(err);
      });
  });

  routes.get('/payment/callback', (req, res) => {
    const query = req.query;
   
    onepayIntl.verifyReturnUrl(query).then(results => {
      if (results.isSucceed) {
        res.render('success', {
          title: 'Nau Store - Thank You',
          orderId: results.orderId,
          price: results.price,
          message: results.message,
        });
      } else {
        res.render('errors', {
          title: 'Nau Store - Payment Errors',
          message: results.message,
        });
      }
    });
  });