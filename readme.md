# Ports-From-Pid

> Get the `LISTENING` port(s) of the process.

## Install

```
$ npm install --save ports-from-pid
```

## Usage

Get `all` the ports associated with the Process:

```js
const portFromPid = require("ports-from-pid");

portFromPid(9364).then(data => {
  console.log(data);
});

/**
 [ 
   { proto: 'TCP',
    localaddress: { addr: '0.0.0.0:5005', port: '5005' },
    foreignAddress: { addr: '0.0.0.0:0', port: '0' },
    state: 'LISTENING' },
  { proto: 'TCP',
    localaddress: { addr: '[::]:5005', port: '5005' },
    foreignAddress: { addr: '[::]:0', port: '0' },
    state: 'LISTENING' } 
  ]
*/
```

### With Options

```js
const portFromPid = require("ports-from-pid");

portFromPid(9364, { onlyPorts: true }).then(data => {
  console.log(data);
});

// ['5005']
```

## API

### portFromPid(pid, opt)

#### pid

Type: `number`

ID of the Process to look for Listening ports.

#### opt

Type: `object`

Options:

```js
{
  onlyPorts: true | false;
}
```

#### opt.onlyPort

Type: `boolean`

If `true` the `Array[ports]` is returned. else detailed array of objects is returned.

## License

MIT © [Saad Hassan](https://saadhassan.me)
