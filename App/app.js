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

// GAP functions
function set(val, name, type, device, i) {
    // val - the gap amount in px
    // name - class name extension 
    // type - margin or padding

    var imp = '';
    if(i == true) {
        imp = '!important';
    } else {
        imp = '';
    }

    var ext = type.charAt(0);
    var out = '';
    out += '.'+device+ext+name+' {'+type+': ' + val + 'px '+imp+';}\n';
    out += '.'+device+ext+'-t'+name+' {'+type+'-top: ' + val + 'px '+imp+';}\n';
    out += '.'+device+ext+'-b'+name+' {'+type+'-bottom: ' + val + 'px '+imp+';}\n';
    out += '.'+device+ext+'-l'+name+' {'+type+'-left: ' + val + 'px '+imp+';}\n';
    out += '.'+device+ext+'-r'+name+' {'+type+'-right: ' + val + 'px '+imp+';}\n';
    out += '.'+device+ext+'-tb'+name+' {'+type+'-top: ' + val + 'px '+imp+'; '+type+'-bottom: ' + val + 'px '+imp+';}\n';
    out += '.'+device+ext+'-lr'+name+' {'+type+'-left: ' + val + 'px '+imp+'; '+type+'-right: ' + val + 'px '+imp+';}\n';
    out += '\n';
    return out;
}

function print() {
    var gapHalf = 5;
    var gap = 15; 

    // var gap2 = gap*2; 
    // var gap3 = gap*3; 
    // var gap4 = gap*4; 
    // var gap5 = gap*5; 
    // var gap6 = gap*6;
    // var arr = [gap2,gap3,gap4,gap5,gap6];

    var arr = [gap*2,gap*3,gap*4,gap*5,gap*6];

    var out = "";
    var name = '';

    //ALL MARGINS 1-100
    // for (let i = 1; i < 100; i++) {
    //     name = '-' + String((i)) ;
    //     out += set(i,name,'margin');
    // }

    // GAP MARGINS
    out += '/*Margin*/\n'

    out += set(0,'-0','margin','', true);
    out += set(gapHalf,'-gh','margin','', true);
    out += set(gap,'-g','margin','', true);

    for (let i = 0; i < arr.length; i++) {
        name = '-g' + String((i+2)) ;
        out += set(arr[i],name,'margin','', true);
    }

    out += '@media only screen and (max-width: 640px) {\n\n';

    out += set(0,'-0','margin','', true);
    out += set(gapHalf,'-gh','margin','', true);
    out += set(gapHalf,'-g','margin','', true);

    for (let i = 0; i < arr.length; i++) {
        name = '-g' + String((i+2));
        if(i<1) {
            out += set(15,name,'margin','', true);
        } else {
            out += set(arr[i-1],name,'margin','', true);
        }
    }
    out += '}\n\n';

    // GAP MARGINS MOBILE
    out += '/*Margins Mobile*/\n'
    out += '@media only screen and (max-width: 640px) {\n\n';
    out += set(0,'-0','margin','mob-', true);
    out += set(gapHalf,'-gh','margin','mob-', true);
    out += set(gapHalf,'-g','margin','mob-', true);
    for (let i = 0; i < arr.length; i++) {
        name = '-g' + String((i+2));
        if(i<1) {
            out += set(15,name,'margin','mob-', true);
        } else {
            out += set(arr[i-1],name,'margin','mob-', true);
        }
    }
    out += '}\n\n';

    // GAP PADDING
    out += '/*Padding*/ \n'
    out += set(0,'-0','padding','', true);
    out += set(gapHalf,'-gh','padding','', true);
    out += set(gap,'-g','padding','', true);
    for (let i = 0; i < arr.length; i++) {
        name = '-g' + String((i+2)) ;
        out += set(arr[i],name,'padding','', true);
    }
    out += '@media only screen and (max-width: 640px) {\n\n';
    
    out += set(0,'-0','padding','', true);
    out += set(gapHalf,'-gh','padding','', true);
    out += set(gapHalf,'-g','padding','', true);

    for (let i = 0; i < arr.length; i++) {
        name = '-g' + String((i+2)) ;
        if(i<1) {
            out += set(15,name,'padding','', true);
        } else {
            out += set(arr[i-1],name,'padding','', true);
        }
    }
    out += '}\n';

    // GAP PADDING MOBILE
    out += '/*Padding Mobile*/\n'
    out += '@media only screen and (max-width: 640px) {\n\n';
    out += set(0,'-0','padding','mob-', true);
    out += set(gapHalf,'-gh','padding','mob-', true);
    out += set(gapHalf,'-g','padding','mob-', true);
    for (let i = 0; i < arr.length; i++) {
        name = '-g' + String((i+2)) ;
        if(i<1) {
            out += set(15,name,'padding','mob-', true);
        } else {
            out += set(arr[i-1],name,'padding','mob-', true);
        }
    }
    out += '}\n';

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