import { Text, View } from "react-native";

type Props = {
  title: string;
  count?: number;
  tone?: "default" | "danger";
};

export function SectionHeader({ title, count, tone = "default" }: Props) {
  return (
    <View className="mb-3 mt-6 flex-row items-center gap-2">
      <Text
        accessibilityRole="header"
        className={`text-[18px] font-bold ${
          tone === "danger" ? "text-[#C0392B]" : "text-[#1F2D36]"
        }`}
      >
        {title}
      </Text>
      {count !== undefined ? (
        <View
          className={`min-w-[22px] items-center rounded-full px-2 py-0.5 ${
            tone === "danger" ? "bg-[#FDECEC]" : "bg-[#E8F1F6]"
          }`}
        >
          <Text
            className={`text-[12px] font-bold ${
              tone === "danger" ? "text-[#C0392B]" : "text-[#4A7F9E]"
            }`}
          >
            {count}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
