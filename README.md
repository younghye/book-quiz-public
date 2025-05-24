# Kid's Book Quiz Game
#### A fun and engaging way to test a child's knowledge of books is through a quiz game. These quizzes can be interactive, with questions about characters and plot details.
1. On the home page, enter the book title and author, and Groq AI Inference will respond with quiz data about the book.
2. A black image appears randomly on the screen, and each time you answer a question correctly, the image becomes brighter.
3. If your quiz score is 8 or higher, you can watch a short YouTube video of kids read aloud books.

#
<img src="https://github.com/younghye/book-quiz/blob/master/public/assets/images/README/home.png"/>

#
<img src="https://github.com/younghye/book-quiz/blob/master/public/assets/images/README/quiz1.png"/>

#
<img src="https://github.com/younghye/book-quiz/blob/master/public/assets/images/README/quiz2.png"/>

#
<img src="https://github.com/younghye/book-quiz/blob/master/public/assets/images/README/score.png"/>

#
<img src="https://github.com/younghye/book-quiz/blob/master/public/assets/images/README/video.png"/>

## Setup
1. Clone this repository. <br />
2. Create a Groq API key and update the variable of the API key in the ".env" file.
3. If use a DockerFile <br />
  docker build -t tagName:version .<br />
  docker run -p 3000:3000 tagName:version

## Demo
https://kidbookquiz.netlify.app/<br />
This app is using free tier of Groq with rate limits. If the app exceeds day rate limits, you will not be able to use the app until next day. Sorry!




