const { SendEmailCommand } = "@aws-sdk/client-ses";
const { sesClient } = "./sesClient.js";

const createSendEmailCommand = (toAddress, fromAddress) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [],
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "<h1> This is the Email Body </h1>",
        },
        Text: {
          Charset: "UTF-8",
          Data: "This is the Text Format",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Hello Worlds from SES",
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [],
  });
};

const run = async () => {
  const sendEmailCommand = createSendEmailCommand(
    "krishnatripathi158@gmail.com",
    "krishna@devtinderonline.online"
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

// snippet-end:[ses.JavaScript.email.sendEmailV3]
module.exports = { run };
