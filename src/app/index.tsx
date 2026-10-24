import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        this is the index page of my expo app
      </Text>
      <Link href="/login" className="text-blue-500 underline">
        Login
      </Link>
    </View>
  );
}
