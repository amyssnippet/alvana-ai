import { Stack } from "expo-router"

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Loading" }} />
      <Stack.Screen name="chat" options={{ title: "AI Chat" }} />
    </Stack>
  )
}
