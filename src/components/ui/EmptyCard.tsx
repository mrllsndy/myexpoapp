import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
};

export function EmptyCard({ icon, text }: Props) {
  return (
    <View className="items-center rounded-2xl bg-white px-4 py-6 shadow-sm">
      <Ionicons name={icon} size={28} color="#9AA9B1" />
      <Text className="mt-2 text-center text-[14px] text-[#5F6F78]">
        {text}
      </Text>
    </View>
  );
}
