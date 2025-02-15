import { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ImageBackground, Image } from "react-native";
import axios from "axios";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        isUser: true,
      };
      setMessages([...messages, newMessage]);
      setInputText("");
      setLoading(true);

      try {
        // Make sure the URL is correct for your endpoint
        const response = await axios.post(
          "https://vigilant-halibut-wwqjvgp5p7rfgrqv-11434.app.github.dev/api/generate", 
          {
            model: "alvana", // Specify the model
            prompt: inputText.trim(),
            stream: false,
          },
          { timeout: 100000 } // Optional: set timeout in ms (5 seconds for example)
        );

        // Check if the 'response' field exists in the response data
        const aiResponseText = response.data.response || "No response from AI";
        
        // AI response
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponseText, // Display the AI's response text
          isUser: false,
        };

        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Sorry, something went wrong. Please try again later.",
          isUser: false,
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setLoading(false); // Reset loading state after the request is done
      }
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, item.isUser ? styles.userMessage : styles.aiMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require("../assets/images/alvana1.jpeg")}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.header}>
        <Image style={styles.logo} source={require("../assets/images/nobg.jpeg")} resizeMode="contain" />
        <Text style={styles.headText}>A1vana</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading AI response...</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: "cover",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  logo: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  headText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
  },
  messageText: {
    color: "#000000",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#ffffff",
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  loadingText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});
