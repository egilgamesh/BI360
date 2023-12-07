class ChatComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
            .comments {
                text-align: left;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                overflow-y: auto;
                height: 90%;
                width: 100%
            }
    
            .comments h2 {
                margin-bottom: 10px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
    
            .comments ul {
                list-style: none;
                padding: 0;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
    
            .comments-li {
                display: flex;
                flex-direction: column;
                margin-bottom: 10px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
    
            .userProfileimg {
                width: 30px;
                height: 30px;
                border-radius: 10%;
                margin-right: 10px;
            }
    
            .comment-info {
                font-size: 13px;
                font-weight: bold;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                display: flex;
                flex-direction: row;
    
            }
    
           .comment-text {
                font-size: 12px;
                color: #8B8181;
            }
    
            .reply-button {
                font-size: 12px;
                cursor: pointer;
                color: #5B5A5A;
                font-weight: 500;
            }
    
            .ProfileInfo {
                margin-left: 10px;
            }
    
            .Username {
                font-weight: bold;
                color: #5B5A5A;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 14px;
    
            }
    
            .userEmail {
                font-weight: normal;
                color: #8B8181;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 14px;
            }
    
            .ListViewContainer {
                display: flex;
                flex-direction: column;
                align-items: center;
                align-items: stretch
            }
    
    
            .list-view {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
                border-radius: 13px;
                border: 1px solid #ddd;
    
            }
    
            .list-view th,
            .list-view td {
                border-top: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
                padding: 8px;
                text-align: left;
    
            }
    
            .list-view th {
                background-color: #d8d8d8;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 12px;
                color: #7e7e7e;
            }
    
            .list-view tr {
                background-color: #fff;
    
            }
    
            .list-view tr:hover {
                background-color: #e1f2ff;
                cursor: pointer;
            }
    
            .ListViewHeader {
                margin-top: 35px;
                align-items: start;
                color: #515151;
                margin-left: 0px;
                font-size: 20px;
                font-weight: bold;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
    
            .TapbuttonContainre {
                margin-top: 20px;
                display: flex;
                flex-direction: row;
                column-gap: 15px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 14px;
            }
    
            .tab {
                color: #999;
                cursor: pointer;
            }
    
            .active {
                color: #515151;
                border-bottom: 2px solid #515151;
            }
    
            .commentBoxContainer {
                position: absolute;
                bottom: 10px;
                border-top: 1px solid #d0d0d0;
                margin-left: 0px;
            }
    
            .CommentTextBox {
                margin-top: 10px;
                outline: none;
                border: none;
                font-size: 12px;
                padding: 5px;
            }
    
            .CommentTextBox:focus {
                margin-top: 10px;
                outline: none;
                border: 1px solid #d0d0d0;
            }
    
            .ChatUserName {
                color: #5B5A5A;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
    
            .CommentItem {
                margin-top: 30px;
                list-style-type: none;
            }
    
            .CommentHeader {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
    
            .timeago {
                color: #8B8181;
                font-weight: normal;
                font-size: 12px;
            }
    
            .comment {
                display: flex;
                flex-direction: column;
                width: 100%;
                row-gap: 5px;
            }
    
            .comment-text-contents {
                color: #8B8181;
                font-size: 12px;
                font-weight: normal;
            }

            .chatContainer{
                margin-left: 0px;
                padding: 0px;
            }
            </style>
            <ul class="chatContainer" id="chatContainer"></ul>
        `;
    }

    connectedCallback() {
        const chat = this.getAttribute('chatData');
        this.generateChatData(chat);
    }

    generateChatData(chat)
    {
       this.loadJSONFile(chat)
        .then(data => {
            this.generateChat(data)
        })
    }

    loadJSONFile(jsonFilePath) {
        return fetch(jsonFilePath)
            .then(response => response.json())
            .then(data => {
                // Return the loaded JSON data
                return data;
            })
            .catch(error => {
                console.error('Error loading JSON:', error);
                throw error; // Re-throw the error to be handled by the caller if needed
            });
    }

    timeAgo(timestamp) {
        const currentDate = new Date();
        const inputDate = new Date(timestamp);

        const timeDifference = currentDate - inputDate;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return days === 1 ? "1 day ago" : days + " days ago";
        } else if (hours > 0) {
            return hours === 1 ? "1 hour ago" : hours + " hours ago";
        } else if (minutes > 0) {
            return minutes === 1 ? "1 minute ago" : minutes + " minutes ago";
        } else {
            return seconds === 1 ? "1 second ago" : seconds + " seconds ago";
        }
    }

    generateChat(chat) {
        const chatcontainer = this.shadowRoot.getElementById('chatContainer');
        chat.forEach(chatitem => {
            const commentItem = document.createElement("li");
            commentItem.className = "CommentItem";

            const commentInfo = document.createElement("div");
            commentInfo.className = "comment-info";

            const userImage = document.createElement("img");
            userImage.className ="userProfileimg";
            userImage.src = chatitem.profilePic;
            userImage.alt = chatitem.profilePic;

            const commentDiv = document.createElement("div");
            commentDiv.className = "comment";

            const commentHeader = document.createElement("div");
            commentHeader.className = "CommentHeader";

            const userNameDiv = document.createElement("div");
            userNameDiv.className = "ChatUserName";
            userNameDiv.innerText = chatitem.username;

            const timeAgoDiv = document.createElement("div");
            timeAgoDiv.id = chatitem.id
            timeAgoDiv.className = "timeago";


            timeAgoDiv.innerHTML = this.timeAgo(chatitem.timeago);

            commentHeader.appendChild(userNameDiv);
            commentHeader.appendChild(timeAgoDiv);

            const commentTextDiv = document.createElement("div");
            commentTextDiv.className = "comment-text";

            const commentTextContents = document.createElement("span");
            commentTextContents.className = "comment-text-contents";
            commentTextContents.innerText = chatitem.text;

            commentTextDiv.appendChild(commentTextContents);

            const replyButtonDiv = document.createElement("div");
            replyButtonDiv.className = "reply-button";
            replyButtonDiv.innerText = "Reply";

            commentDiv.appendChild(commentHeader);
            commentDiv.appendChild(commentTextDiv);
            commentDiv.appendChild(replyButtonDiv);

            commentInfo.appendChild(userImage);
            commentInfo.appendChild(commentDiv);

            commentItem.appendChild(commentInfo);
            chatcontainer.appendChild(commentItem);
        });

    }
}

customElements.define('chat-component', ChatComponent);

