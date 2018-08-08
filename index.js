'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
let facFunction = require('./facFunction');
let useFactory = facFunction();
const moment = require('moment');

let app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// route
app.get('/', function (req, res) {
    res.render('home', useFactory.returnAnswer());
});

// use this Post type for Forms post.
app.post('/settings', function (req, res) {
    let smsValue = (req.body.smsValue);
    let callValue = (req.body.callValue);
    let warningLevelSet = (req.body.warningLevelSet);
    let criticalLevelSet = (req.body.criticalLevelSet);

    useFactory.setCall(callValue);
    useFactory.setSms(smsValue);
    useFactory.setWarningLevel(warningLevelSet);
    useFactory.setCriticalLevel(criticalLevelSet);

    res.redirect('/');
});

app.post('/action', function (req, res) {
    let billItemTypeWithSettings = req.body.billItemTypeWithSettings;
    useFactory.calculate(billItemTypeWithSettings);
    res.redirect('/');
});

app.get('/actions/', function (req, res) {
    let billList = useFactory.returnBill();
    console.log(billList);

    // loop over billList
    billList.forEach(bill => {
        // add a new property which is your timestamp as a 'fromNow' string
        bill.timeAgo = moment(bill.stamp).fromNow();
    });
    res.render('actions', { billList });
});

app.get('/actions/:type', function (req, res) {
    let type = req.params.type;
    let billListTime = useFactory.filterActions(type);
    billListTime.forEach(bill => {
        // add a new property which is your timestamp as a 'fromNow' string
        bill.timeAgo = moment(bill.stamp).fromNow();
    });
    if (type === 'call' || type === 'sms') {
        res.render('actions', {billList: billListTime});
    }
});

app.post('/clear', function (req, res) {
    useFactory.clearAll();
    res.redirect('/');
});

// port set-up
let PORT = process.env.PORT || 3090;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
