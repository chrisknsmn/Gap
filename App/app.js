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

var dir = 
[
    {
        title: '',
        el: ['']
    },
    {
        title: '-t',
        el: ['-top']
    },
    {
        title: '-b',
        el: ['-bottom']
    },
    {
        title: '-l',
        el: ['-left']
    },
    {
        title: '-r',
        el: ['-right']
    },

    {
        title: '-tb',
        el: ['-top', '-bottom']
    },
    {
        title: '-lr',
        el: ['-left', '-right']
    }

];



function setClass(val, title, type, dir, device, important) {
    //Create single class
    var r = ''
    r += '.' + device + type.charAt(0) + dir.title + '-' + title + ' { ';
    //Looping through miltiple directions
    for (let i = 0; i < dir.el.length; i++) {
        r += type + dir.el[i] + ': ' + val + 'px ' + important + '; ';
    }
    r += '} \n';
    return r;
}

function classGroup(val, title, type, imp) {
    var r = ''
    for (let i = 0; i < dir.length; i++) {
        r += setClass(val, title, type, dir[i], '', imp);
    }
    r += '\n';
    return r;
}

function print() {
    var gapHlf = 5;
    var gap = 15; 

    var arr = [gap*2,gap*3,gap*4,gap*5,gap*6];

    // qtr hlf g dbl 

    var out = "";
    var name = '';

    //ALL MARGINS 1-100
    // for (let i = 1; i < 100; i++) {
    //     name = '-' + String((i)) ;
    //     out += set(i,name,'margin','',true);
    // }

    
    out += classGroup(gapHlf, ( 'g-hlf' ), 'margin', '!important');
    out += classGroup(gap, ( 'g' ), 'margin', '!important');

    for (let i = 0; i < arr.length; i++) {
        out += classGroup(arr[i], ( 'g' + (i+2)), 'margin', '!important');
    }

    // for (let i = 0; i <= 100; i++) {
    //     out += classGroup(i, i, 'margin', '!important');
    //     out += '\n';
    // }



    // GAP PADDING MOBILE
    // out += '/*Padding Mobile*/\n'
    // out += '@media only screen and (max-width: 640px) {\n\n';

    // out += set(0,'-0','padding','mob-', true);
    // out += set(gapHalf,'-gh','padding','mob-', true);
    // out += set(gapHalf,'-g','padding','mob-', true);

    // for (let i = 0; i < arr.length; i++) {
    //     name = '-g' + String((i+2)) ;
    //     if(i<1) {
    //         out += set(15,name,'padding','mob-', true);
    //     } else {
    //         out += set(arr[i-1],name,'padding','mob-', true);
    //     }
    // }

    return out;
}

// Write to scss file
const fs = require('fs');
// Data which will write in a file.
let data = print();
// Write data in 'Output.txt' .
fs.writeFile('../Template/_assets-custom/sass/gap.scss', data, (err) => {
    // In case of a error throw err.
    if (err) throw err;
})