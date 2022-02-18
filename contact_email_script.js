function formSubmit(e) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = ss.getSheetByName('Form Responses 1'); 
    var timestamp = e.namedValues['Timestamp'][0];
    var respondentEmailAddress = e.namedValues['Email Address'][0]; 
    var respondentName = e.namedValues['Name'][0]; 
    var inquiry = e.namedValues['Inquiry'][0]; 
    
    //Email template to admin
    var toAdminEmailAdress = 'contact@pikespeakmakerspace.org';  
    var notificationSubject = respondentName + '_Contact-Us Inquiry'; 
    var notificationBodyText = 
        'There is a new submission for your Contact Us Form!\n' +
        'Form Details:\n' + 
        'Date/Time Submitted: ' + timestamp + ' \n'+ 
        'Submitted by: ' + respondentName + ' \n' + 
        'Email: ' + respondentEmailAddress + ' \n' + 
        'Inquiry: ' + inquiry;
    
    var notificationHtml = 
        '<h3>There is a new submission for your Contact Us Form!</h3>' + 
        '<h4>Form Details:</h4>' + 
            '<ul>' + 
              '<li>Date/Time Submitted: ' + timestamp + '</li>' +
              '<li>Submitted by: ' + respondentName + '</li>' + 
              '<li>Email: ' + respondentEmailAddress + '</li>' +
              '<li>Inquiry: ' + inquiry + '</li>' + 
            '</ul>';
  
      var options = {
        htmlBody: notificationHtml,
        from: 'contact@pikespeakmakerspace.org',
        replyTo: respondentEmailAddress
      }
      
    //send email notification to Admin
    GmailApp.sendEmail(toAdminEmailAdress, notificationSubject, notificationBodyText, options);
    
    
    //Email template to respondent
    var confirmationSubject = 'Thank you for contacting Pikes Peak Makerspace!'; 
    var confirmationBody = 'The email requires HTML support. Please use a client that supports HTML';
    var confirmationHtmlText = 
        '<h3>Below are the details for you inquiry with us.</h3>' + 
        '<h4>Inquiry Details:</h4>' + 
            '<ul>' + 
              '<li>Date/Time Submitted: ' + timestamp + '</li>' +
              '<li>Submitted by: ' + respondentName + '</li>' + 
              '<li>Email: ' + respondentEmailAddress + '</li>' +
              '<li>Inquiry: ' + inquiry + '</li>' + 
            '</ul>' + 
        '<p>We will do our best to respond to your inquiry within a timely manner!</p>' + 
        '<br>' + 
        '<h4>Pikes Peak Makerspace</h4>' + 
        '<h5>contact@pikespeakmakerspace.org</h5>' + 
        '<h5>(719) 445-MAKE (6253)</h5>';
  
        var options = {
          htmlBody: confirmationHtmlText,
          name: 'Pikes Peak Makerspace', //this cannot be named Contact Us. Gmail gets confused and respondent emails get sent to us too
          from: 'contact@pikespeakmakerspace.org'
        }
    
    //send email confirmation to Respondent
    GmailApp.sendEmail(respondentEmailAddress, confirmationSubject, confirmationBody, options);
   }
  