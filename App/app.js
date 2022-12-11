//Load HTTP module
const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {
  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function set(val, name, type, device) {
    // val - the gap amount in px
    // name - class name extension 
    // type - margin or padding
    var ext = type.charAt(0);
    var out = '';
    out += '.'+device+ext+name+' {'+type+': ' + val + 'px !important;}\n';
    out += '.'+device+ext+'-t'+name+' {'+type+'-top: ' + val + 'px !important;}\n';
    out += '.'+device+ext+'-b'+name+' {'+type+'-bottom: ' + val + 'px !important;}\n';
    out += '.'+device+ext+'-l'+name+' {'+type+'-left: ' + val + 'px !important;}\n';
    out += '.'+device+ext+'-r'+name+' {'+type+'-right: ' + val + 'px !important;}\n';
    out += '.'+device+ext+'-tb'+name+' {'+type+'-top: ' + val + 'px !important; '+type+'-bottom: ' + val + 'px !important;}\n';
    out += '.'+device+ext+'-lr'+name+' {'+type+'-left: ' + val + 'px !important; '+type+'-right: ' + val + 'px !important;}\n';
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
    out += set(0,'-0','margin','');
    out += set(gapHalf,'-gh','margin','');
    out += set(gap,'-g','margin','');
    for (let i = 0; i < arr.length; i++) {
        name = '-g' + String((i+2)) ;
        out += set(arr[i],name,'margin','');
    }
    out += '@media only screen and (max-width: 640px) {\n\n';
    out += set(0,'-0','margin','');
    out += set(gapHalf,'-gh','margin','');
    out += set(gapHalf,'-g','margin','');
    for (let i = 0; i < arr.length; i++) {
        name = '-g' + String((i+2));
        if(i<1) {
            out += set(15,name,'margin','');
        } else {
            out += set(arr[i-1],name,'margin','');
        }
    }
    out += '}\n\n';

    // GAP MARGINS MOBILE
    out += '/*Margins Mobile*/\n'
    out += '@media only screen and (max-width: 640px) {\n\n';
    out += set(0,'-0','margin','mob-');
    out += set(gapHalf,'-gh','margin','mob-');
    out += set(gapHalf,'-g','margin','mob-');
    for (let i = 0; i < arr.length; i++) {
        name = '-g' + String((i+2));
        if(i<1) {
            out += set(15,name,'margin','mob-');
        } else {
            out += set(arr[i-1],name,'margin','mob-');
        }
    }
    out += '}\n\n';

    // GAP PADDING
    out += '/*Padding*/ \n'
    out += set(0,'-0','padding','');
    out += set(gapHalf,'-gh','padding','');
    out += set(gap,'-g','padding','');
    for (let i = 0; i < arr.length; i++) {
        name = '-g' + String((i+2)) ;
        out += set(arr[i],name,'padding','');
    }
    out += '@media only screen and (max-width: 640px) {\n\n';
    out += set(0,'-0','padding','');
    out += set(gapHalf,'-gh','padding','');
    out += set(gapHalf,'-g','padding','');
    for (let i = 0; i < arr.length; i++) {
        name = '-g' + String((i+2)) ;
        if(i<1) {
            out += set(15,name,'padding','');
        } else {
            out += set(arr[i-1],name,'padding','');
        }
    }
    out += '}\n';

    // GAP PADDING MOBILE
    out += '/*Padding Mobile*/\n'
    out += '@media only screen and (max-width: 640px) {\n\n';
    out += set(0,'-0','padding','mob-');
    out += set(gapHalf,'-gh','padding','mob-');
    out += set(gapHalf,'-g','padding','mob-');
    for (let i = 0; i < arr.length; i++) {
        name = '-g' + String((i+2)) ;
        if(i<1) {
            out += set(15,name,'padding','mob-');
        } else {
            out += set(arr[i-1],name,'padding','mob-');
        }
    }
    out += '}\n';

    return out;
}

// Requiring fs module in which
// writeFile function is defined.
const fs = require('fs');
// Data which will write in a file.
let data = print();
// Write data in 'Output.txt' .
fs.writeFile('../Template/_assets-custom/sass/gap.scss', data, (err) => {
    // In case of a error throw err.
    if (err) throw err;
})