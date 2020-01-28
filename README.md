# Invoice Generator

A program that generates ZIX-encrypted invoice drafts, given a master client list and matching attachments.

## Setup

### Machine Requirements

1. Clone this repository on your local machine.
2. Download Node.js (for either Windows or Mac).

### Authorization

The invoice generator uses the Gmail API, so you'll have to authorize the application to access your personal inbox.

1. Generate credentials by navigating to https://developers.google.com/gmail/api/quickstart/go.
2. Click 'Enable the Gmail API'.
3. Download the client configuration and open the file.
4. Copy the contents of the file to the credentials.json file within this application.

### Content Requirements

#### Contact Information

The application hinges upon the existence of a master\_incentives\_savings_template.xlsx file existing on the top level of the program. The contents of this file should match the schema defined at the top of the contacts.js file.

#### Attachments

All potential attachments must be stored within the 'invoices' folder, and should include their matching Employer Group ID from master\_incentives\_savings_template.xlsx somewhere within the file name.

#### Email Contents

*Body:* The email body is sourced from the email_body.txt file. If you wish to change the text of the email body, this is where you should update it.

*Subject & From:* These fields can be updated in the constructor of the mail.js file.

#### Task

The default task of the program is 'draft', i.e., the script will generate email drafts to your Gmail Drafts which you can manually send at your leisure. Alternatively, you can change the task to 'mail' in the mail.js file, which will automatically send your generated emails to all recipients. The sent emails will show up in your Sent inbox.

## Use

The first time the program is run, the application will need to generate an authorization token prior to completing the script. Any subsequent runs of the program will not require generating a new token.

1. Make sure all setup has been completed prior to running the program (see above).
2. Run `node index.js` from your console.
3. Follow the instructions and go to the URL given.
4. Authorize Quickstart and copy the resulting code in your console.
5. The program should output successes or errors accordingly.
