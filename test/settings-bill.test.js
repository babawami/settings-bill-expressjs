'use strict';
let assert = require('assert');
let facFunction = require('../facFunction');
let enteredBill = facFunction();
describe('settingBill,Select call or sms and it should add amount of sms cost or call cost', function () {
    it('Return amount for the call cost that is set', function () {
        enteredBill.setCall(1);
        let bill = enteredBill.returnAnswer();
        assert.strictEqual(bill.callValue, 1);
    });
    it('Return amount for the sms cost that is set', function () {
        enteredBill.setSms(2);
        let bill = enteredBill.returnAnswer();
        assert.strictEqual(bill.smsValue, 2);
    });
    it('Return amount for the warning level that is set', function () {
        enteredBill.setWarningLevel(10);
        let bill = enteredBill.returnAnswer();
        assert.strictEqual(bill.warningLevelSet, 10);
    });
});
