document.addEventListener('DOMContentLoaded', async () => {
    const jokeContainer = document.getElementById('joke');

    try {
        // Fetch the joke from the server
        const fetchJoke = async () => {
            try {
                const response = await fetch('http://localhost:8000/');
                const data = await response.json();
                jokeContainer.textContent = data.joke;
            } catch (error) {
                console.error('Error fetching joke:', error);
                jokeContainer.textContent = 'Error fetching joke';
            }
        };

        // Call the function to fetch the joke
        await fetchJoke(); 
    } catch (error) {
        console.error('Error:', error);
    }

    const askButton = document.getElementById('askButton');
    const questionInput = document.getElementById('questionInput');
    const systemInput = document.getElementById('systemInput');
    const chatHistoryDiv = document.getElementById('chatHistory');
    const answerDiv = document.getElementById('answer');

    let chatHistory = []; // Initialize chat history array

    askButton.addEventListener('click', async () => {
        const question = questionInput.value;
        const systemInstruction = systemInput.value;

        // Clear input fields after button click
        questionInput.value = "";
        systemInput.value = "";

        // Construct the system message
        const systemMessage = ["system", systemInstruction];

        // Construct the chat history
        chatHistory.push(["human", question]);
        chatHistory.push(systemMessage);

        // Display the updated chat history
        renderChatHistory();

        // Disable the button while fetching
        askButton.disabled = true;

        // Show loading spinner
        askButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Asking...';

        try {
            // Pass the entire chat history to the server
            const response = await fetch('http://localhost:8000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: chatHistory })
            });

            if (!response.ok) {
                throw new Error('Failed to get response from server');
            }

            const data = await response.json();
            // Add AI's response to chat history
            chatHistory.push(["ai", data.answer]);

            // Display the updated chat history
            renderChatHistory();

            // Display AI's response
            answerDiv.innerText = data.answer;
        } catch (error) {
            console.error('Error:', error);
            answerDiv.innerText = 'Error fetching answer';
        } finally {
            // Re-enable the button
            askButton.disabled = false;
            // Reset button text
            askButton.innerHTML = 'Ask';
        }
    });

    function renderChatHistory() {
        chatHistoryDiv.innerHTML = ''; // Clear existing chat history

        chatHistory.forEach(message => {
            const role = message[0];
            const content = message[1];
            const messageDiv = document.createElement('div');
            messageDiv.className = role;
            messageDiv.textContent = content;
            chatHistoryDiv.appendChild(messageDiv);
        });
    }
});

// Load Iframe Player API
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player) after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '351',
        width: '576',
        videoId: 'osqvOUJjaCo',
        playerVars: {
            'playsinline': 1,
            'start': 125,
            'title': 'The Best Meal Plan To Build Muscle Faster',
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
function onPlayerReady(event) {
    const title = player.getVideoData().title;
    console.log("`Random` Title:", title);

    // Make an HTTP request to the server using GET method
    fetch(`http://localhost:8000/?title=${encodeURIComponent(title)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data.joke); // Log the joke received from the server
            displayJoke(data.joke); // Call a function to display the joke
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    event.target.playVideo();
}

// Function to display the joke in the HTML
function displayJoke(joke) {
    const jokeElement = document.getElementById('joke');
    jokeElement.textContent = joke;
}


// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 60000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}