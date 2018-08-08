'use strict';
module.exports = function () {
    let callValue = '';
    let smsValue = '';
    let updatecalls = 0;
    let updatesms = 0;
    let criticalLevelSet = '';
    let warningLevelSet = '';
    let totalCostSet = 0;
    let bill = [];

    function setCall (call) {
        if (call !== '') {
            callValue = parseFloat(call);
        } else {
            callValue = 0;
        }
    }

    function setSms (sms) {
        if (sms !== '') {
            smsValue = parseFloat(sms);
        } else {
            smsValue = 0;
        }
    }

    function setWarningLevel (updateWarning) {
        if (updateWarning !== '') {
            warningLevelSet = parseFloat(updateWarning);
        } else {
            warningLevelSet = 0;
        }
    }

    function setCriticalLevel (updateCritical) {
        if (updateCritical !== '') {
            criticalLevelSet = parseFloat(updateCritical);
        } else {
            criticalLevelSet = 0;
        }
    }

    function calculate (billItemTypeSet) {
        let records = {
            type: billItemTypeSet,
            stamp: new Date()
        };

        if (totalCostSet >= criticalLevelSet) {
            return;
        } else {
            if (billItemTypeSet === 'call') {
                records.cost = callValue;
                updatecalls += callValue;
                totalCostSet += callValue;
            } else if (billItemTypeSet === 'sms') {
                records.cost = smsValue;
                updatesms += smsValue;
                totalCostSet += smsValue;
            }
        }
        bill.unshift(records);
    }

    function returnBill () {
        return bill;
    }

    const colours = function () {
        if (totalCostSet >= warningLevelSet && totalCostSet < criticalLevelSet) {
            return 'warning';
        }
        if (totalCostSet >= criticalLevelSet && totalCostSet > warningLevelSet) {
            return 'danger';
        }
    };

    function filterActions (type) {
        return bill.filter(record => record.type === type);
    }

    function returnAnswer () {
        return {
            updatecalls: updatecalls.toFixed(2),
            updatesms: updatesms.toFixed(2),
            totalCostSet: totalCostSet.toFixed(2),
            callValue,
            smsValue,
            criticalLevelSet,
            warningLevelSet,
            colours

        };
    }

    function clearAll () {
        callValue = '';
        smsValue = '';
        updatecalls = 0;
        updatesms = 0;
        criticalLevelSet = '';
        warningLevelSet = '';
        totalCostSet = 0;
        bill = [];
    }

    return {

        setCall,
        setSms,
        setWarningLevel,
        setCriticalLevel,
        calculate,
        returnAnswer,
        returnBill,
        filterActions,
        clearAll
    };
};
