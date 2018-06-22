# bluejeans-chat-sdk

this SDK enables users to easily integrate the bluejeans chat feature into any application

# Getting Started
Please follow the installation instructions, create a BlueJeans meeting using our API, obtain the meeting ID, and execute the following JS code:

BJChat = new chat();

BJChat.onReceiveMessage();

BJChat.connectToMeeting(meetingID);

# Once Set up
After this code has been executed, one can now send messages to the chat using the sendMessage function with the message (string) as a parameter, for example:

var message = "Welcome to the Chat!";

BJChat.sendMessage(message);



