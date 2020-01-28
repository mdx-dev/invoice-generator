// https://www.npmjs.com/package/read-excel-file
const readXlsxFile = require('read-excel-file/node');

// TODO: Read from json file
const schema = {
  'Netsuite Parent Account': {
    prop: 'parentAccount',
    type: String
  },
  'Netsuite ID#': {
    prop: 'employerGroupId',
    type: Number
  },
  'Customer Netsuite Company Name': {
    prop: 'companyName',
    type: String
  },
  'Billing Contact(s) Email Address': {
    prop: 'emailAddresses',
    type: String
  },
  'Client Engagement Manager': {
    prop: 'engagementManager',
    type: String
  },
  'Invoice Type': {
    prop: 'invoiceType',
    type: String
  }
}

class Contacts{

  getContacts(callback){
    readXlsxFile('./master_incentive_savings_template.xlsx', { schema }).then((data) => {
      if(data.errors.length){
        return console.log(data.errors);
      }

      let contacts = []
      for(let i = 0; i < data.rows.length; i++){
        contacts.push(new Contact(
          data.rows[i].employerGroupId,
          data.rows[i].emailAddresses.split('; ').join(','),
          data.rows[i].invoiceType,
          data.rows[i].companyName
        ))
      }
      callback(contacts);
    });
  }

}

class Contact{

  constructor(employerGroupId, emailAddresses, invoiceType, companyName){
    this.employerGroupId = employerGroupId;
    this.emailAddresses = emailAddresses;
    this.invoiceType = invoiceType;
    this.companyName = companyName;
  }

}

module.exports = Contacts;
