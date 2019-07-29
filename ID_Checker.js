var request = require("request");

const TOKEN = ""
const GROUP_INFO_URL = 'https://slack.com/api/groups.info';
const SLACK_CHANNEL_ID = "";

var getMemberList = function() {
  const options = {
    method: 'POST',
    uri: GROUP_INFO_URL,
    simple: false,
    resolveWithFullResponse: true,
    headers: {
      "content-type": "multipart/form-data"
    },
    form: {
      token: TOKEN,
      channel: SLACK_CHANNEL_ID
    }
  };

  request(options, function (error, response, body) {
    var body = JSON.parse(response.body);
    var members = body.group.members;
		console.log("members:" + members + "\n");
		for (member in members) {
			getUserName(members[member]);
		}
  });
}

function getUserName(member) {
	var options = { method: 'POST',
	  url: 'https://slack.com/api/users.info',
	  headers: { 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
	  formData:
	   { token: TOKEN,
	     user: member } };

	request(options, function (error, response, body) {
	  if (error) throw new Error(error);
	  console.log(member + " -> " + JSON.parse(response.body).user.name);
	});
}

getMemberList();
