import ollama
import chromadb

# Initialize the ChromaDB client
client = chromadb.PersistentClient(path="./chroma_db")

# Create a collection
collection = client.get_or_create_collection(name="knowledge_base")

# Add knowledge from your data.txt
data = [
  {
    "question": "What is Atharva College of Engineering?",
    "answer": "Atharva College of Engineering was established in 1999 by The Atharva Educational Trust. It is located in Malad, Mumbai, and is affiliated with Mumbai University. The college offers courses in Computers, Information Technology, Electronics & Telecommunication, and Electronics Engineering."
  },
  {
    "question": "Who founded Atharva College of Engineering?",
    "answer": "Atharva College of Engineering was founded by The Atharva Educational Trust, which was established to provide high-quality technical education in Maharashtra."
  },
  {
    "question": "What is the vision of Atharva College of Engineering?",
    "answer": "The college aims to produce well-disciplined, practical-oriented, and highly knowledgeable engineers who contribute to society and the nation."
  },
  {
    "question": "Who is Sunil Dattatray Rane?",
    "answer": "Sunil Dattatray Rane is an Indian politician and a member of the Maharashtra Legislative Assembly from the Borivali constituency. He is also the founder of Atharva Foundation and has been actively involved in educational initiatives."
  },
  {
    "question": "What courses are offered at Atharva College of Engineering?",
    "answer": "The college offers programs in Applied Mathematics, Applied Physics, Applied Chemistry, Engineering Mechanics, Professional and Communication Ethics, Basic Electrical & Electronics Engineering, C Programming, Python Programming, and various core engineering disciplines."
  },
  {
    "question": "Who is the principal of Atharva College of Engineering?",
    "answer": "Dr. Ramesh Kulkarni is the principal of Atharva College of Engineering."
  },
  {
    "question": "What is the Atharva Foundation?",
    "answer": "The Atharva Foundation was founded in 2016 by Sunil Dattatray Rane to provide quality education and support underprivileged sections of society."
  },
  {
    "question": "Who are the notable faculty members at Atharva College of Engineering?",
    "answer": "Some of the faculty members include Dr. Ritu Sharma (Head of Humanities & Applied Sciences), Dr. Bhushan Sonawane (Chemistry, 20 years experience), Dr. Priyanka Badani (Chemistry, MH-SET, 13 years experience), Dr. Balaji Shinde (English Literature, 18 years experience), and many more."
  },
  {
    "question": "What certifications does Atharva College of Engineering hold?",
    "answer": "The college is ISO 9001:2015, 21001:2018, and 14001:2015 certified."
  },
  {
    "question": "Where is Atharva College of Engineering located?",
    "answer": "Atharva College of Engineering is located in Malad, Mumbai, Maharashtra, India."
  }
]


for entry in data:
    collection.add(ids=[entry["id"]], documents=[entry["content"]])

# Function to search the database and generate responses
def ask_alvana(question):
    results = collection.query(query_texts=[question], n_results=3)
    
    retrieved_info = " ".join([doc for doc in results["documents"][0]])

    # Pass the retrieved info to the model
    response = ollama.chat(model="alvana-ai", messages=[
        {"role": "system", "content": "Use the retrieved information to answer the question."},
        {"role": "user", "content": f"Question: {question}\n\nRelevant Info: {retrieved_info}"}
    ])
    
    return response['message']

# Example usage
print(ask_alvana("Who is the principal of Atharva College?"))
