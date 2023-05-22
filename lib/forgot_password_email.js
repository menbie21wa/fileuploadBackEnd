"use strict";
require('dotenv').config()

const nodemailer = require("nodemailer");

exports._sendEMAIL = (user) => {
    console.log("userrrr",user)

    // let _CC = 

    
    // if(Object.keys(hotelData).length > 0){
    //     if(hotelData.hotelEmail) _CC.push(hotelData.hotelEmail)
    //     if(hotelData.hotelManager) _CC.push(hotelData.hotelManager)
    // }

    // async..await is not allowed in global scope, must use a wrapper
    async function main(html) {
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user:"misge1898@gmail.com", //_CONFIG._VALS._CREDS._GETFEE.username,
            pass:"lxkubjbhwbprrwlm"
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: {
            name:"EplusApp",
            address:"mise1898@gmail.com"
    },//process.env.USERNAME, // sender address
        to: user.email, // list of receivers
        //cc: _CC,
        subject: "EplusApp - ForgotPassword", // Subject line
        // text: "Hello world?", // plain text body
        html: html,//will be replaced with message body
          attachments: [{
              filename: 'eplusapp-Logo.jpeg',
              path: '../assets/eplusapp-logo.jpeg',
              cid: 'eplusapp-logo'
          },
          {
              filename: 'forgot-password.png',
              path: '../assets/forgot-password.png',
              cid: 'forgot-password'
          },
          ]
      });
      //console.log("prossess",process.env)
    
      nodemailer.getTestMessageUrl(info);
    }
    
    var USER_NAME = user.fullName;
    
    let html = `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
        <!--[if (gte mso 9)|(IE)]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- So that mobile will display zoomed in -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- enable media queries for windows phone 8 -->
        <meta name="format-detection" content="telephone=no"> <!-- disable auto telephone linking in iOS -->
        <meta name="format-detection" content="date=no"> <!-- disable auto date linking in iOS -->
        <meta name="format-detection" content="address=no"> <!-- disable auto address linking in iOS -->
        <meta name="format-detection" content="email=no"> <!-- disable auto email linking in iOS -->
        <title>Email</title>
    
        <link href="https://fonts.googleapis.com/css?family=Josefin+Sans:300,300i,400,400i,600,600i,700,700i,800,800i"
            rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Lora:300,300i,400,400i,600,600i,700,700i,800,800i"
            rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i"
            rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Dancing+Script:300,300i,400,400i,600,600i,700,700i,800,800i"
            rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,600,600i,700,700i,800,800i"
            rel="stylesheet">
    
        <style type="text/css">
            /* basics */
            body {
                margin: 0px !important;
                padding: 0px !important;
                display: block !important;
                min-width: 100% !important;
                width: 100% !important;
                -webkit-text-size-adjust: none;
            }
    
            table {
                border-spacing: 0;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
    
            table td {
                border-collapse: collapse;
            }
    
            strong {
                font-weight: bold !important;
            }
    
            td img {
                -ms-interpolation-mode: bicubic;
                display: block;
                width: auto;
                max-width: auto;
                height: auto;
                margin: auto;
                display: block !important;
                border: 0px !important;
            }
    
            td p {
                margin: 0 !important;
                padding: 0 !important;
                display: inline-block !important;
                font-family: inherit !important;
            }
    
            td a {
                text-decoration: none !important;
            }
    
            /* outlook */
            .ExternalClass {
                width: 100%;
            }
    
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
                line-height: inherit;
            }
    
            .ReadMsgBody {
                width: 100%;
                background-color: #ffffff;
            }
    
            /* iOS blue links */
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
    
            /* gmail blue links */
            u+#body a {
                color: inherit;
                text-decoration: none;
                font-size: inherit;
                font-family: inherit;
                font-weight: inherit;
                line-height: inherit;
            }
    
            /* buttons fix */
            .undoreset a,
            .undoreset a:hover {
                text-decoration: none !important;
            }
    
            .yshortcuts a {
                border-bottom: none !important;
            }
    
            .ios-footer a {
                color: #aaaaaa !important;
                text-decoration: none;
            }
    
            /* responsive */
            @media screen and (max-width: 640px) {
    
                td.img-responsive img {
                    width: 100% !important;
                    max-width: 100% !important;
                    height: auto !important;
                    margin: auto;
                }
    
                table.row {
                    width: 100% !important;
                    max-width: 100% !important;
                }
    
                table.center-float,
                td.center-float {
                    float: none !important;
                }
    
                /* stops floating modules next to each other */
                td.center-text {
                    text-align: center !important;
                }
    
                td.container-padding {
                    width: 100% !important;
                    padding-left: 15px !important;
                    padding-right: 15px !important;
                }
    
                table.hide-mobile,
                tr.hide-mobile,
                td.hide-mobile,
                br.hide-mobile {
                    display: none !important;
                }
    
                td.menu-container {
                    text-align: center !important;
                }
    
                td.autoheight {
                    height: auto !important;
                }
    
                table.mobile-padding {
                    margin: 15px 0 !important;
                }
    
                table.br-mobile-true td br {
                    display: initial !important;
                }
    
            }
        </style>
    </head>
    
    <body>
    
        <!--module-->
        <table style="width:100%;max-width:100%;" width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
            <tr>
                <td bgcolor="#F4F4F4" align="center">
    
                    <!--container-->
                    <table class="row" style="width:600px;max-width:600px;" width="600" cellspacing="0" cellpadding="0"
                        border="0" align="center">
                        <tr>
                            <td bgcolor="#ffffff" align="center">
    
                                <!--wrapper-->
                                <table class="row" style="width:540px;max-width:540px;" width="540" cellspacing="0"
                                    cellpadding="0" border="0" align="center">
                                    <tr>
                                        <td class="container-padding" align="center">
    
    
    
                                            <!-- content container -->
                                            <table width="540" border="0" cellpadding="0" cellspacing="0" align="center"
                                                class="row" style="width:540px;max-width:540px;">
                                                <tr>
                                                    <td align="center">
    
                                                        <!-- content -->
                                                        <table border="0" width="100%" cellpadding="0" cellspacing="0"
                                                            align="center" style="width:100%; max-width:100%;">
                                                            <tr>
                                                                <td height="40">&nbsp;</td>
                                                            </tr>
                                                            <tr>
                                                                <td>
    
                                                                    <table border="0" width="100%" cellpadding="0"
                                                                        cellspacing="0" align="center">
                                                                        <tr>
                                                                            <td width="200" align="left">
                                                                                <img align="left" width="200"
                                                                                    style="display:block;width:100%;max-width:200px;"
                                                                                    alt="img"
                                                                                    src="cid:GetRooms-Logo-2">
                                                                            </td>
                                                                            <td width="30">&nbsp;</td>
                                                                            <td align="right"
                                                                                style="font-family:'Open Sans', Arial, Helvetica, sans-serif;font-size: 14px;color: #183D59;">
                                                                                Help Center</td>
                                                                        </tr>
                                                                    </table>
    
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td height="40">&nbsp;</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center"><img width="100"
                                                                        style="display:block;width:100%;max-width:100px;"
                                                                        alt="img" src="cid:user-register"></td>
                                                            </tr>
                                                            <tr>
                                                                <td height="20">&nbsp;</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center"
                                                                    style="font-family:'Josefin Sans', Arial, Helvetica, sans-serif;font-size: 30px;color: #183D59;">
                                                                    Dear ${USER_NAME},Your account has been confirmed</td>
                                                            </tr>
    
                                                            <tr>
                                                                <td height="18">&nbsp;</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center"
                                                                    style="font-family:'Open Sans', Arial, Helvetica, sans-serif;font-size: 14px;color: #183D59;line-height: 22px">
                                                                    Thank you for creating a GetRooms account. Enjoy Our
                                                                    Services !</td>
                                                            </tr>
    
    
    
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td height="18">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td align="center"
                                                        style="font-family:'Open Sans', Arial, Helvetica, sans-serif;font-size: 14px;color: #183D59;">
                                                        If you have any question. Please feel free to contact us.</td>
                                                </tr>
                                                <tr>
                                                    <td height="40">&nbsp;</td>
                                                </tr>
                                            </table>
    
                                        </td>
                                    </tr>
                                </table>
    
    
    
                            </td>
                        </tr>
                    </table>
    
                </td>
            </tr>
        </table>
    
        </td>
        </tr>
        </table>
    
        <!--module-->
        <table style="width:100%;max-width:100%;" width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
            <tr>
                <td bgcolor="#F4F4F4" align="center">
    
                    <!--container-->
                    <table class="row" style="width:600px;max-width:600px;" width="600" cellspacing="0" cellpadding="0"
                        border="0" align="center">
                        <tr>
                            <td bgcolor="#183D59" align="center">
    
                                <!--wrapper-->
                                <table class="row" style="width:540px;max-width:540px;" width="540" cellspacing="0"
                                    cellpadding="0" border="0" align="center">
                                    <tr>
                                        <td class="container-padding" align="center">
    
    
    
                                            <!-- content container -->
                                            <table width="540" border="0" cellpadding="0" cellspacing="0" align="center"
                                                class="row" style="width:540px;max-width:540px;">
                                                <tr>
                                                    <td align="center">
    
                                                        <!-- content -->
                                                        <table border="0" width="100%" cellpadding="0" cellspacing="0"
                                                            align="center" style="width:100%; max-width:100%;">
                                                           
    
                                                            <tr>
                                                                <td height="20">&nbsp;</td>
                                                            </tr>
                                                            <tr>
                                                                <td height="20">&nbsp;</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center"
                                                                    style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size: 13px;color: #dadada;line-height: 19px;">
                                                                    For any inquires please contact us  contact@getfee.me<br>
                                                                    +251973013301/ +251973014401/ +251973015501<br>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>&nbsp;</td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <td height="20">&nbsp;</td>
                                                            </tr>
                                                        </table>
    
                                                    </td>
                                                </tr>
                                            </table>
    
    
    
                                        </td>
                                    </tr>
                                </table>
    
                            </td>
                        </tr>
                    </table>
    
                </td>
            </tr>
        </table>
    </body>
    
    </html>`
    
    try {
        main(html)
            .then(()=> {
                console.log('SENT USER!')
            })
    } catch (error) {
        console.error
    }
}