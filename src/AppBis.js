import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const fetchResponse = async () => {
    try {
      const result = await axios.post(
        `https://api.openai.com/v1/engines/text-davinci-003/completions`,
        {
          prompt,
          max_tokens: 512,
          n: 1,
          stop: null,
          temperature: 1,
          },
        {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
          },
        }
      );

      const generatedText = result.data.choices[0].text;
        setResponse(generatedText);
      } catch (error) {
        console.error('Error fetching data from OpenAI API:', error);
        setResponse('An error occurred. Please try again.');
      }
    };

return (
  <div className="App">
    <h1>React OpenAI App</h1>
    <label htmlFor="prompt">Prompt:</label>
    <input
    id="prompt"
    type="text"
    value={prompt}
    onChange={(e) => setPrompt(e.target.value)}
    />
    <button onClick={fetchResponse}>Get Response</button>
    <div>
    <h2>Response:</h2>
    <p>{response}</p>
    </div>
  </div>
);
};

export default App;
