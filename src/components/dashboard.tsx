import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export type Task = {
  id: string;
  title: string;
  subject: string;
  color: string;
  time?: string;
  daysLate?: number;
  done: boolean;
};

export function SectionHeader({
  title,
  count,
  tone = "default",
}: {
  title: string;
  count?: number;
  tone?: "default" | "danger";
}) {
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

export function EmptyCard({
  icon,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) {
  return (
    <View className="items-center rounded-2xl bg-white px-4 py-6 shadow-sm">
      <Ionicons name={icon} size={28} color="#9AA9B1" />
      <Text className="mt-2 text-center text-[14px] text-[#5F6F78]">
        {text}
      </Text>
    </View>
  );
}

export function TaskRow({
  task,
  onToggle,
}: {
  task: Task;
  onToggle?: (id: string) => void;
}) {
  const overdue = task.daysLate !== undefined;
  return (
    <View className="mb-2.5 flex-row items-center rounded-2xl bg-white p-3.5 shadow-sm">
      <Pressable
        onPress={() => onToggle?.(task.id)}
        disabled={!onToggle}
        hitSlop={10}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.done }}
        accessibilityLabel={`Mark ${task.title} as ${task.done ? "not done" : "done"}`}
        className={`h-7 w-7 items-center justify-center rounded-full border-2 ${
          task.done
            ? "border-[#659BB9] bg-[#659BB9]"
            : "border-[#B8CBD6] bg-white"
        }`}
      >
        {task.done ? (
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        ) : null}
      </Pressable>

      <View className="ml-3 flex-1">
        <Text
          numberOfLines={1}
          className={`text-[15px] font-semibold ${
            task.done ? "text-[#9AA9B1] line-through" : "text-[#1F2D36]"
          }`}
        >
          {task.title}
        </Text>
        <View className="mt-1 flex-row items-center gap-1.5">
          <View
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: task.color }}
          />
          <Text className="text-[12px] text-[#5F6F78]">{task.subject}</Text>
        </View>
      </View>

      {overdue ? (
        <View className="rounded-full bg-[#FDECEC] px-2.5 py-1">
          <Text className="text-[12px] font-bold text-[#C0392B]">
            {task.daysLate}d late
          </Text>
        </View>
      ) : task.time ? (
        <Text className="text-[12px] font-semibold text-[#4A7F9E]">
          {task.time}
        </Text>
      ) : null}
    </View>
  );
}
