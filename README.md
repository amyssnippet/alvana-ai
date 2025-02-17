# Alvana AI

Alvana AI is an advanced AI model designed from the ground up for a wide range of tasks. While it is built entirely from scratch in concept, it leverages DeepSeek R1 from Ollama and the Qwen 0.5 billion model as foundational components.

## Features
- **Multi-Purpose AI**: Designed to handle various tasks across different domains.
- **Custom Model Development**: Based on DeepSeek R1 and Qwen 0.5B but optimized uniquely.
- **Flask-Based API**: Provides seamless interaction via a RESTful API.
- **Web Crawling & Wikipedia Access**: Integrated features for fetching real-time and static knowledge.
- **Real-Time Date Information**: Provides accurate date and time-related responses.
- **API Key System**: Secure authentication for API access, inspired by OpenAI’s approach.
- **Token Limit Control**: Each API key has a token limit of around 5 million tokens.

## API Overview
Alvana AI's API allows developers to integrate its capabilities into their applications easily. It includes:

- **Authentication**: Uses a randomly generated API key system.
- **Endpoints**:
  - `/generate`: Process and generate AI responses.
  - `/crawl`: Perform web crawling for real-time data.
  - `/wiki`: Fetch Wikipedia summaries.
  - `/date`: Retrieve real-time date information.
  
## Technologies Used
- **Ollama**: Running DeepSeek R1 model.
- **Python & Flask**: Backend API development.
- **JavaScript**: API key system implementation.
- **Web Scraping & Wikipedia API**: For enhanced knowledge retrieval.

## Usage
### API Key Generation
```js
fetch('https://your-api.com/generate-key')
  .then(response => response.json())
  .then(data => console.log(data.api_key));
```

### Making API Calls
```js
fetch('https://your-api.com/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ prompt: "Hello, Alvana AI!" })
})
.then(response => response.json())
.then(data => console.log(data.response));
```

## Contributing
Feel free to contribute by submitting issues or pull requests.

## License
MIT License

