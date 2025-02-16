import { useEffect } from "react"
import { View, Image, StyleSheet } from "react-native"
import { useRouter } from "expo-router"

export default function LoadingScreen() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.replace("/chat") // Redirect to "/chat" after 2 seconds
    }, 2000)
  }, [])

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/alvana.png")} style={styles.logo} resizeMode="contain" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 200,
    height: 200,
  },
})
