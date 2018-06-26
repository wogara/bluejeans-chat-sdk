var auth = require("./auth.js");

var _ = require('underscore');
var my = require('myclass');
var sockjs = require('sockjs-client');

var evtModule = require('./eventService');
var readline = require('readline');

function errMsg(msg){
	console.log("Error: " + msg);
}

function statusMsg(msg){
	console.log("Status: " + msg);
};


function chatSDK(){

	var ChatSDK = my.Class({

		constructor: function(){

			this.myMeetingEvents = evtModule.eventService();

		},

		disconnect: function(){
			this.myMeetingEvents.close();
		},

		onReceiveMessage: function(handler){

			this.myMeetingEvents.registerHandler(handler, 'meeting.register.error');   
			this.myMeetingEvents.registerHandler(handler, 'meeting.chat');

		},

		getMyMeetingEvents: function(){
			return this.myMeetingEvents;
		},

		connectToMeeting: function(meeting_id){

			var oauthRec = {
	 			grant_type :"meeting_passcode",
	 			meetingNumericId : meeting_id,
				meetingPasscode : ""
			};

			var uri = "api.bluejeans.com";
			var authPath = "/oauth2/token?meeting_id";

			var meeting = this.myMeetingEvents;

			auth.post( uri, authPath,oauthRec).then(function(results){

				var access_token = results.access_token;
				var fields = results.scope.meeting.meetingUri.split("/");
				var partition = results.scope.partitionName;
				var user_id = fields[3];

				if (meeting)
				{
					var opts =
		 			{
						'numeric_id': meeting_id,
						'access_token': access_token,
						'user' : {
						'full_name': 'Mr. Chat',
						'is_leader': true
						},
						'leader_id': user_id,
						'protocol': '2',
						'endpointType': 'commandCenter',
						'eventServiceUrl': 'https://bluejeans.com/' + partition + '/evt/v1/' + meeting_id
					};

				meeting.setUpSocket(opts);
				meeting.setStatusCallbacks(statusMsg,errMsg);
	
				};

			},function(errors){
				console.log("Error! here: " + errors);
				process.exit();
			});

		},

		sendMessage: function(message){

			this.myMeetingEvents.sendEvent("meeting.chat.msg", {
                	msg: message
                	});

		}

	});
	return new ChatSDK;
}

module.exports.chatSDK = chatSDK;