'use strict';
let assert = require('assert');
let facFunction = require('../facFunction');
describe('settingBill,Select call or sms and it should add amount of sms cost or call cost', function () {
    it('Return amount for the call cost that is set', function () {
        let enteredBill = facFunction();
        enteredBill.setCall(1);
        let bill = enteredBill.returnAnswer();
        assert.strictEqual(bill.callValue, 1);
    });
    it('Return amount for the sms cost that is set', function () {
        let enteredBill = facFunction();
        enteredBill.setSms(2);
        let bill = enteredBill.returnAnswer();
        assert.strictEqual(bill.smsValue, 2);
    });
    it('Return amount for the warning level that is set', function () {
        let enteredBill = facFunction();
        enteredBill.setWarningLevel(10);
        let bill = enteredBill.returnAnswer();
        assert.strictEqual(bill.warningLevelSet, 10);
    });
    it('Return amount for the critical level that is set', function () {
        let enteredBill = facFunction();
        enteredBill.setCriticalLevel(20);
        let bill = enteredBill.returnAnswer();
        assert.strictEqual(bill.criticalLevelSet, 20);
    });
    it("Return total amount for the sms's made only", function () {
        let enteredBill = facFunction();
        enteredBill.setSms(1);
        enteredBill.setCall(2);
        enteredBill.setCriticalLevel(10);
        enteredBill.calculate('sms');
        enteredBill.calculate('sms');
        enteredBill.calculate('call');
        let bill = enteredBill.returnAnswer();
        assert.strictEqual(bill.updatesms, '2.00');
    });
    it('Return total amount for the calls made only', function () {
        let enteredBill = facFunction();
        enteredBill.setSms(1);
        enteredBill.setCall(2);
        enteredBill.setCriticalLevel(10);
        enteredBill.calculate('sms');
        enteredBill.calculate('sms');
        enteredBill.calculate('call');
        enteredBill.calculate('call');
        let bill = enteredBill.returnAnswer();
        assert.strictEqual(bill.updatecalls, '4.00');
    });
    it("Return total amount for the calls and sms's made", function () {
        let enteredBill = facFunction();
        enteredBill.setSms(1);
        enteredBill.setCall(2);
        enteredBill.setCriticalLevel(10);
        enteredBill.calculate('sms');
        enteredBill.calculate('sms');
        enteredBill.calculate('call');
        enteredBill.calculate('call');
        let bill = enteredBill.returnAnswer();
        assert.strictEqual(bill.totalCostSet, '6.00');
    });
    it('Return danger if critical level is reached', function () {
        let enteredBill = facFunction();
        enteredBill.setSms(1);
        enteredBill.setCall(2);
        enteredBill.setCriticalLevel(10);
        enteredBill.calculate('sms');
        enteredBill.calculate('sms');
        enteredBill.calculate('call');
        enteredBill.calculate('call');
        enteredBill.calculate('call');
        enteredBill.calculate('call');
        enteredBill.calculate('call');
        let bill = enteredBill.returnAnswer();
        assert.strictEqual(bill.colours(), 'danger');
    });
    it('Return warning if warning level is reached', function () {
        let enteredBill = facFunction();
        enteredBill.setSms(1);
        enteredBill.setCall(2);
        enteredBill.setWarningLevel(10);
        enteredBill.setCriticalLevel(20);
        enteredBill.calculate('sms');
        enteredBill.calculate('sms');
        enteredBill.calculate('call');
        enteredBill.calculate('call');
        enteredBill.calculate('call');
        enteredBill.calculate('call');
        let bill = enteredBill.returnAnswer();
        assert.strictEqual(bill.colours(), 'warning');
    });
});
