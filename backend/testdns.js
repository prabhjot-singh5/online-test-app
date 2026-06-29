const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.cluster0.wimb05z.mongodb.net",
  (err, records) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(records);
  }
);