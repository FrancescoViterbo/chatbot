// Replies
class Reply {
    constructor(knownSentences, knownReplies) {
        this.knownSentences = knownSentences;
        this.knownReplies = knownReplies;
    }
    AIreply(loweredMessage) {
        if (this.knownSentences.includes(loweredMessage)) {
            // console.log(this.knownReplies);
            var reply = this.knownReplies[Math.floor(Math.random() * this.knownReplies.length)];
            return reply;
        }
    }
}

salute = new Reply();
salute.knownSentences = ["hi", "hello", "what's up", "good morning", "good evening",
                        "good day", "hey", "hey there"];
    if (new Date().getHours() >= 12 && new Date().getHours() <= 24) {
        salute.knownSentences.splice(3, 1);
    } else {
        salute.knownSentences.splice(4, 1);
    }
salute.knownReplies = salute.knownSentences;

// Connection to index.html
const chatHistory = document.getElementById('chat-history');
const inputField = document.getElementById('message');

inputField.addEventListener('keypress', function(e){
    if (e.key === 'Enter') {
        var msgSent = sendMessage();
        var aiReplay = salute.AIreply(msgSent);
        if (aiReplay != undefined) {
            receiveMessage(aiReplay);
        }
    }
});

/* Get the message from the input field and put it into the chat history */
function sendMessage() {
    var msg = inputField.value;
    if (msg != '') {
        /* Get date */
        let seconds = new Date().getSeconds();
        if (seconds < 10) {
            seconds = "0" + seconds.toString();
        }
        let dateUTCfull = (new Date().getDate()).toString() + "/" +
        (new Date().getMonth()).toString() + "/" + (new Date().getFullYear()).toString()
        + " " + (new Date().getHours()).toString() + ":" +
        (new Date().getMinutes()).toString() + ":" + seconds;
        /* Create the main div for text message */
        var div = document.createElement('div');
        div.classList.add('my-message-div');
        /* Create an inner div */
        var messageDiv = document.createElement('div');
        messageDiv.classList.add('my-message');
        /* Create a paragraph and insert the message in it */
        var parag = document.createElement('p');
        parag.classList.add('text');
        parag.innerText = msg;
        /* Create a paragraph that contains the date */
        var date = document.createElement('p');
        date.classList.add('date');
        date.innerText = dateUTCfull;
        /* Append each element to the parent ones */
        div.appendChild(messageDiv);
        messageDiv.appendChild(parag);
        messageDiv.appendChild(date);
        chatHistory.appendChild(div);
        chatHistory.scrollTop = chatHistory.scrollHeight;
        /* Clear the input field value */
        inputField.value = "";
        /* Prepare the value for the Reply */
        loweredMsg = msg.toLowerCase();
        return loweredMsg;
    }
}

function receiveMessage(x) {
    var dateUTCfull = new Date();
    /* Create the main div for text message */
    var div = document.createElement("div");
    div.classList.add('bot-message-div');
    /* Create an inner div */
    var messageDiv = document.createElement("div");
    messageDiv.classList.add('bot-message');
    /* Create a paragraph and insert the message in it */
    var parag = document.createElement('p');
    parag.classList.add('text');
    parag.innerText = x;
    /* Create a paragraph that contains the date */
    var date = document.createElement('p');
    date.classList.add('date');
    date.innerText = dateUTCfull;
    /* Append each element to the other ones */
    div.appendChild(messageDiv);
    messageDiv.appendChild(parag);
    messageDiv.appendChild(date);
    chatHistory.appendChild(div);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}
