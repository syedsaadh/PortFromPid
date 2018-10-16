var exec = require("child_process").exec;

module.exports = (pid, opts) => {
  if (typeof pid !== "number") {
    throw new TypeError("Expected a Process Id number");
  }
  opts = opts || {};
  return new Promise((resolve, reject) => {
    getPort(pid)
      .then(data => {
        if (opts.onlyPorts) {
          let ports = [];
          data.forEach(item => {
            ports.push(item.localaddress.port);
          });
          resolve(ports.filter((v, i, a) => a.indexOf(v) === i));
        }
        resolve(data);
      })
      .catch(err => reject(err));
  });
};

function getAddrPortFromIp(ip) {
  return {
    addr: ip,
    port: ip
      ? ip.match(/(:\d+)/g)
        ? ip.match(/(:\d+)/g)[0].substr(1)
        : ""
      : ""
  };
}
function getPort(pid) {
  return new Promise((resolve, reject) => {
    exec(`netstat -ano | findstr ${pid}`, (err, stdout, stderr) => {
      if (!err) {
        let resp = [];
        let lines = stdout.trim().split("\n");
        lines.forEach((line, index) => {
          let splits = line.trim().split(/\s+/);
          let proto = splits[0];
          let localaddress = getAddrPortFromIp(splits[1]);
          let foreignAddress = getAddrPortFromIp(splits[2]);
          let state = splits[3];
          let process = splits[4];
          if (state === "LISTENING") {
            let data = {
              proto,
              localaddress,
              foreignAddress,
              state
            };
            resp.push(data);
          }
        });
        resolve(resp);
      }
      reject(err || stderr);
    });
  });
}
