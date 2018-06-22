# bluejeans-chat-sdk

this SDK enables users to easily integrate the bluejeans chat feature into any application

# Installation

To use the library locally without publishing to a remote npm registry, first install the dependencies by changing into the directory containing package.json (and this README). Then, in the command window, run:

npm install

# Getting Started
Please follow the installation instructions, create a BlueJeans meeting using our API, obtain the meeting ID, and execute the following JS code:

var handler =
		{
    		onMessage: function(event, edata)
    		{
        		//console.log("Received a chat event: " + conBright + JSON.stringify(eventData,null,2) + conReset);
				var mt = new Date(edata.timestamp).toLocaleString() + ", " + edata.sender.name;
				console.log(mt);
				console.log("--> " + conBgYellow + edata.body + conReset );
    		}
		};


var chatModule = require('./chatSDK.js');

let chatApp = new chatModule.chatSDK();

chatApp.onReceiveMessage(handler);

chatApp.connectToMeeting(meetingID);

Here, the handler is the function that

# Once Set up
After this code has been executed, one can now send messages to the chat using the sendMessage function with the message (string) as a parameter, for example:

var message = "Welcome to the Chat!";

chatApp.sendMessage(message);



