const verifyEmailTemplate = ({name, url}) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        .button-link:hover {
            background-color: #1e7e34 !important; /* Slightly darker green on hover */
            border-color: #1c7430 !important;
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
            <td style="padding: 15px 0; text-align: center;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    
                    <tr>
                        <td style="padding: 30px;">
                            
                            <p style="margin: 0 0 12px 0; font-size: 16px; color: #333333;">Dear ${name},</p>
                            
                            <p style="margin: 0 0 20px 0; font-size: 16px; color: #333333;">Thank you for registering Binkeyit. Please verify your email address to get started:</p>
                            
                            <div style="text-align: center; margin-top: 25px; margin-bottom: 15px;">
                                <a href="${url}" target="_blank" class="button-link" style="
                                    display: inline-block;
                                    color: white; 
                                    background-color: #28a745; /* Base color */
                                    text-decoration: none; 
                                    padding: 10px 22px;
                                    border-radius: 5px;
                                    font-size: 16px;
                                    font-weight: bold;
                                    border: 1px solid #218838;
                                    box-shadow: 0 2px 4px rgba(0,0,0,0.2); 
                                ">
                                    Verify Email
                                </a>
                            </div>
                            
                            <p style="margin: 25px 0 0 0; font-size: 14px; color: #666666;">If you did not register for an account, please ignore this email.</p>

                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    </body>
</html>
    `;
}

export default verifyEmailTemplate;