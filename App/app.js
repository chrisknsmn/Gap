
// EXPRESS Start
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3030;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);
// EXPRESS end

var dir = 
[
    { title: '', el: [''] },
    { title: '-t', el: ['-top'] },
    { title: '-b', el: ['-bottom'] },
    { title: '-l', el: ['-left'] },
    { title: '-r', el: ['-right'] },
    { title: '-tb', el: ['-top', '-bottom'] },
    { title: '-lr', el: ['-left', '-right'] }
];

var gap = 30; 
// var arr = [gap*2,gap*3,gap*4,gap*5,gap*6];
var setGaps = 
[
    // { title: '0', val: 0 },
    // { title: '5', val: 5 },
    { title: 'qtr', val: gap / 4 },
    { title: 'hlf', val: gap / 2 },
    { title:   'g', val: gap     },
    { title: 'dbl', val: gap * 2 },
    { title: 'trp', val: gap * 3 },
    { title: 'qad', val: gap * 4 }
];

var mobWidth = '@media only screen and (max-width: 640px) {\n\n';

function setClass(val, title, type, dir, device, important) {
    //Create single class
    var r = ''
    r += '.' + device + type.charAt(0) + dir.title + '-' + title + ' { ';
    //Looping through miltiple declarations
    for (let i = 0; i < dir.el.length; i++) {
        r += type + dir.el[i] + ': ' + val + 'px ' + important + '; ';
    }
    r += '} \n';
    return r;
}

function classGroup(val, title, type, device, important) {
    var r = ''
    //Looping through multiple classes
    for (let i = 0; i < dir.length; i++) {
        r += setClass(val, title, type, dir[i], device, important);
    }
    r += '\n';
    return r;
}

//Creates set classes based on gap size - desk shrinks to prev set on mob. 
function classSetGaps(type, important) {
    var r = '', desk = '', deskMob = '', mob = '';

    // Set 0 and 5 as defaults 
    desk += classGroup(0, 0, type, '', important) + classGroup(5, 5, type, '', important);
    deskMob += classGroup(0, 0, type, '', important) + classGroup(5, 5, type, '', important);
    mob += classGroup(0, 0, type, 'mob-', important) + classGroup(5, 5, type, 'mob-', important);

    //Set parameters based on gap.
    for (let i = 0; i < setGaps.length; i++) {
        desk += classGroup(setGaps[i].val, setGaps[i].title, type, '', important);
        deskMob += classGroup(setGaps[ Math.max(0, (i-1)) ].val, setGaps[i].title, type, '', important);
        mob += classGroup(setGaps[ Math.max(0, (i-1)) ].val, setGaps[i].title, type, 'mob-', important);
    }

    r += desk;
    r += mobWidth + deskMob + mob + '}\n\n';
    return r;
}

//Sets all numbers between range - desk and mob match
function classAll(type, start, end, important) {
    var r = '', desk = '', mob = '';
    for (let i = start; i <= end; i++) {
        desk += classGroup(i, i, type, '', important);
        mob += classGroup(i, i, type, 'mob-', important);
    }
    r += desk + mobWidth + mob + '}'
    return r;
}

function out() {
    var r = '';

    r += classSetGaps('margin', '!important');
    // r += classSetGaps('padding', '!important');

    // r += classAll('margin', 0, 10, '!important');
    // r += classAll('padding', 0, 10, '!important');

    return r;
}

// Write to scss file
const fs = require('fs');
// Data which will write in a file.
let data = out();
// Write data in 'Output.txt' .
fs.writeFile('../Template/_assets-custom/sass/gap.scss', data, (err) => {
    // In case of a error throw err.
    if (err) throw err;
})