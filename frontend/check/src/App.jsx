import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take up to 10 seconds");
    try {
      const response = await axios({
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC6K6R1cm5r9Dh4CV7-ZLXdwL3MXlAY_Fo',
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(answer).then(() => {
      alert("Answer copied to clipboard!");
    }).catch((err) => {
      console.error('Could not copy text: ', err);
    });
  }

  return (
    <div className="bg-white h-screen p-3">
      <div className="main w-full md:w-2/3 m-auto text-center rounded bg-gray-50 py-2">
        <form onSubmit={generateAnswer}>
          <textarea
            required
            className="border rounded w-11/12 my-2 min-h-fit p-3"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-300 p-3 rounded-md hover:bg-blue-400 transition-all duration-300"
            disabled={generatingAnswer}
          >
            {generatingAnswer ? "Generating..." : "Generate answer"}
          </button>
        </form>
        <div className="answer-container w-full my-2 border rounded p-3">
          <ReactMarkdown className="p-3">{answer}</ReactMarkdown>
        </div>
        {answer && (
          <button
            onClick={copyToClipboard}
            className="bg-green-300 p-3 rounded-md hover:bg-green-400 transition-all duration-300"
          >
            Copy
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
