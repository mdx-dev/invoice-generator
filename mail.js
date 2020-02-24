const {google} = require('googleapis');
const mailComposer = require('nodemailer/lib/mail-composer');
const Attachments = require('./attachments.js');
const fs = require('fs');

class Mail{

  constructor(auth, contact){
    const { emailAddresses, employerGroupId, companyName } = contact;
    this.gmail = google.gmail({version: 'v1', auth});
    this.auth = auth;
    this.from = 'gretchen.ziegler@sapphire-digital.com';
    this.to = emailAddresses;
    this.employerGroupId = employerGroupId;
    this.company = companyName;
    this.task = 'draft';
    this.subject = `November 2019 Invoice for ${companyName}`;

    try {
      this.body = fs.readFileSync('email_body.txt', 'utf8');
    } catch(e) {
      throw(`Error: ${e}`);
    }
  }

  createMail(){
  	// Get attachments, compile, encode, and send mail.
    let self = this;

    let attachments = new Attachments(this.employerGroupId);

    attachments.encodedList(function(encodedAttachments){
    	self.composeMail(self, encodedAttachments).compile().build((err, msg) => {
        // Do not generate invoice if attachments are missing.
        if(err){
    			return console.log(`Error compiling email: ${err}`);
    		} else if(encodedAttachments.length < 2){
          return console.log(`Will not generate invoice: Attachments missing for ${self.company}`);
        }

    		const encodedMessage = Buffer.from(msg)
    			.toString('base64')
  			  .replace(/\+/g, '-')
  			  .replace(/\//g, '_')
  			  .replace(/=+$/, '');

  			// If the task is 'mail', send automatically. Otherwise, create draft.
  			if(self.task === 'mail'){
  				self.sendMail(encodedMessage);
  			} else {
  				self.saveDraft(encodedMessage);
  			}
    	});
    });
  }

  // Compose mail.
  composeMail(self, attachments){
		return new mailComposer({
			to: self.to,
			text: self.body,
			subject: self.subject,
			textEncoding: 'base64',
			attachments: attachments
		});
  }

  // Send the message to the specified recipient.
  sendMail(encodedMessage){
  	this.gmail.users.messages.send({
  		userId: this.from,
  		resource: {
  			raw: encodedMessage
  		}
  	}, (err, result) => {
  		if(err){
  			return console.log(`The API returned an error: ${err}`);
  		} else {
  			console.log(`Sending email reply from server: ${result.data}`);
  		}
  	});
  }

  // Save a draft.
  saveDraft(encodedMessage){
  	this.gmail.users.drafts.create({
  		userId: this.from,
  		resource: {
  			message: {
  				raw: encodedMessage
  			}
  		}
  	}, (err, result) => {
      if(err){
        return console.log(`Error creating draft: ${err}`);
      } else {
        console.log(`Draft created successfully for: ${this.company}`);
      }
    });
  }
}

module.exports = Mail;
