// node hbar.js --file=sample/test.har
const harReplay = require('har-replay');
const process = require( 'process' );

// get the arguments
const argv = key => {
  // Return true if the key exists and a value is defined
  if ( process.argv.includes( `--${ key }` ) ) return true;

  const value = process.argv.find( element => element.startsWith( `--${ key }=` ) );

  // Return null if the key does not exist and a value is not defined
  if ( !value ) return null;
  
  return value.replace( `--${ key }=` , '' );
}

const repeat = argv("repeat") || 1;


class Timer {
    // Automatically starts the timer
    constructor(name = 'Benchmark') {
        this.NS_PER_SEC = 1e9;
        this.MS_PER_NS = 1e-6
        this.name = name;
        this.startTime = process.hrtime();
    }

    // returns the time in ms since instantiation
    // can be called multiple times
    runtimeMs() {
        const diff = process.hrtime(this.startTime);
        return (diff[0] * this.NS_PER_SEC + diff[1]) * this.MS_PER_NS;
    }

    // retuns a string: the time in ms since instantiation
    runtimeMsStr() {
        return `${this.name} took ${this.runtimeMs()} milliseconds`;
    }
}

function call(i) {
    harReplay.load(argv('file'), { 
        beforeRequest: function(request) {
            //request.headers['Some-New-Header'] = 'abc';
        },
        onResponse: function(response, request, body) {
            console.log('Response status code for ' + request.url + ': ' + response.statusCode);
        },
        onFinish: function() {
            console.log('All done!');
            console.log(t.runtimeMsStr());
            console.log(i)
        },
        onError: function(error, request) {
            console.error(error);
        }
    });
}

const t = new Timer('Time for ' + argv('file'))

for (var i = 0; i < repeat; i++) {
    t.runtimeMsStr();
    call(i);
}



