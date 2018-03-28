function Settings() {
  this.web3provider = "http://127.0.0.1:8546";
};

module.exports = function() {
  var settings = new Settings();
  return settings;
}
