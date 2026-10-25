import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, View } from "react-native";

type FieldProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  error?: string;
  right?: React.ReactNode;
} & React.ComponentProps<typeof TextInput>;

export function Field({ label, icon, error, right, ...inputProps }: FieldProps) {
  return (
    <View className="mb-3">
      <Text className="mb-1.5 text-[13px] font-semibold text-[#1F2D36]">
        {label}
      </Text>
      <View
        className={`h-[52px] flex-row items-center gap-2 rounded-2xl border-[1.5px] bg-[#F4F9FC] px-4 ${
          error ? "border-[#C0392B]" : "border-[#D5E4EC]"
        }`}
      >
        <Ionicons name={icon} size={20} color="#659BB9" />
        <TextInput
          className="flex-1 text-[16px] text-[#1F2D36]"
          placeholderTextColor="#9AA9B1"
          accessibilityLabel={label}
          {...inputProps}
        />
        {right}
      </View>
      {error ? (
        <Text className="mt-1 text-[12px] text-[#C0392B]">{error}</Text>
      ) : null}
    </View>
  );
}
