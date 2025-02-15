import { useState } from "react"
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ImageBackground, Image } from "react-native"

type Message = {
  id: string
  text: string
  isUser: boolean
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        isUser: true,
      }
      setMessages([...messages, newMessage])
      setInputText("")

      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: `AI response to: "${inputText.trim()}"`,
          isUser: false,
        }
        setMessages((prevMessages) => [...prevMessages, aiResponse])
      }, 1000)
    }
  }

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, item.isUser ? styles.userMessage : styles.aiMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  )

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
  )
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
    flexDirection: "row", // This makes the logo and text appear side by side
    alignItems: "center", // Vertically center the items
    padding: 10,
  },
  logo: {
    height: 50, // Adjust height for the logo
    width: 50,  // Adjust width for the logo
    marginRight: 10, // Space between the logo and text
  },
  headText: {
    color: "#fff",
    fontSize: 24, // Adjust font size as needed
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
})
