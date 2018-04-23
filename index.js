var dns = require('dns');
var valid = false;
var message = '';
var regEx = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";

exports.validEmail = function validEmail(email, cb) {
  // Validate email syntax
  if (!email.match(regEx)) {
    valid = false;
    cb(valid, 'invalid email');
    return;
  }  

  // Validate domain MX records
  var domain = email.split('@')[1];  
  dns.resolve(domain, 'MX', function(err, addresses) {    
    if (err) {
      valid = false; 
      message = 'error validating mx';     
    } else if (addresses && addresses.length > 0) {      
      valid = true;
      message = '';     
    } else {
      message = 'no mx record Found';
      valid = false;
    }
    cb(valid, message);    
  });
}
