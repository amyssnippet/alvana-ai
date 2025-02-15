from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
import wikipediaapi
from datetime import datetime

app = Flask(__name__)

# Ollama Alvana API Endpoint
OLLAMA_URL = "https://vigilant-halibut-wwqjvgp5p7rfgrqv-11434.app.github.dev/api/generate"

def query_alvana(prompt):
    """Query Alvana AI model running on Ollama"""
    data = {"model": "alvana", "prompt": prompt}
    response = requests.post(OLLAMA_URL, json=data)
    return response.json().get("response", "Error querying Alvana AI") if response.status_code == 200 else "Alvana AI request failed."

def get_wikipedia_summary(topic):
    """Fetch Wikipedia summary for a given topic"""
    wiki_wiki = wikipediaapi.Wikipedia("en")
    page = wiki_wiki.page(topic)
    return page.summary if page.exists() else "Wikipedia page not found."

def web_crawl(url):
    """Extract the title of a webpage"""
    try:
        response = requests.get(url, timeout=5)
        soup = BeautifulSoup(response.text, "html.parser")
        return soup.title.string if soup.title else "No title found."
    except Exception as e:
        return f"Web crawling error: {str(e)}"

@app.route("/query", methods=["POST"])
def query():
    """Single request querying AI, Wikipedia, Web Crawling, and Date"""
    data = request.json
    query = data.get("query", "")

    # Parallel execution (all at once)
    ai_response = query_alvana(query)
    wiki_response = get_wikipedia_summary(query)
    crawl_response = web_crawl(query)
    date_response = str(datetime.today().date())

    # Unified response
    response = {
        "query": query,
        "alvana_ai": ai_response,
        "wikipedia_summary": wiki_response,
        "web_crawl_title": crawl_response,
        "today_date": date_response
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8888, debug=True)
