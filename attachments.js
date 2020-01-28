const path = require('path');
const fs = require('fs');
const invoicePath = path.join(__dirname, 'invoices');

class Attachments {

  constructor(id){
    this.id = id;
  }

 // Encodes attachments.
 encodedList(callback){
    this.getInvoices(function(err, invoices){
      if(err){
        return console.log(err);
      } else {
        let encodedAttachments = [];
        for(let i = 0; i < invoices.length; i++){
          encodedAttachments[i] = {
            path: `${invoicePath}/${invoices[i]}`,
            encoding: 'base64'
          }
        }
        callback(encodedAttachments);
      }
    });
  }

  // Retrieves invoices from invoices directory using employerGroupId.
  getInvoices(callback){
    let employerId = this.id.toString();
    fs.readdir(invoicePath, function(err, files){
      callback(
        err,
        files.filter(function(file){
          return file.includes(employerId);
        })
      );
    });
  }
}

module.exports = Attachments;
