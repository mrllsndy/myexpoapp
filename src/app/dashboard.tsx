import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EmptyCard } from "../components/ui/EmptyCard";
import { SectionHeader } from "../components/ui/SectionHeader";
import { TaskRow, type Task } from "../features/tasks/TaskRow";
import {
    addDays,
    formatShortDate,
    formatToday,
    greeting,
} from "../utils/dates";

// ---------------------------------------------------------------------------
// SAMPLE DATA: placeholder content so the layout can be built and checked.
// Milestone 5 replaces these arrays with real Supabase queries.
// ---------------------------------------------------------------------------
type Exam = {
  id: string;
  title: string;
  subject: string;
  color: string;
  daysLeft: number;
  date: string;
};

const SAMPLE_NAME = "Student";

const INITIAL_TODAY: Task[] = [
  {
    id: "t1",
    title: "Finish Laravel SIS report",
    subject: "Web Systems",
    color: "#659BB9",
    time: "5:00 PM",
    done: true,
  },
  {
    id: "t2",
    title: "Read chapter 4: Networking",
    subject: "Networking",
    color: "#E8A33D",
    time: "7:30 PM",
    done: false,
  },
  {
    id: "t3",
    title: "Practice SQL joins",
    subject: "Databases",
    color: "#6BB58A",
    time: "9:00 PM",
    done: false,
  },
];

const OVERDUE: Task[] = [
  {
    id: "o1",
    title: "Submit programming activity",
    subject: "Programming",
    color: "#D9706A",
    daysLate: 1,
    done: false,
  },
];

// Sample exams are defined as "N days from today", so daysLeft and the date
// label always agree, whatever day the app is opened.
const examInDays = (n: number) => ({
  daysLeft: n,
  date: formatShortDate(addDays(n)),
});

const EXAMS: Exam[] = [
  {
    id: "e1",
    title: "Midterm exam",
    subject: "Databases",
    color: "#6BB58A",
    ...examInDays(4),
  },
  {
    id: "e2",
    title: "Quiz 3",
    subject: "Networking",
    color: "#E8A33D",
    ...examInDays(9),
  },
];

const QUICK_ACTIONS: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { label: "Task", icon: "checkbox-outline" },
  { label: "Exam", icon: "school-outline" },
  { label: "Subject", icon: "book-outline" },
  { label: "Focus", icon: "timer-outline" },
];

export default function Dashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [today, setToday] = useState<Task[]>(INITIAL_TODAY);

  const toggle = (id: string) =>
    setToday((list) =>
      list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );

  const { done, total, percent } = useMemo(() => {
    const d = today.filter((t) => t.done).length;
    return {
      done: d,
      total: today.length,
      percent: today.length === 0 ? 0 : Math.round((d / today.length) * 100),
    };
  }, [today]);

  return (
    <View className="flex-1 bg-[#FFFCEF]">
      <StatusBar style="light" />
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}
      >
        {/* Header + progress */}
        <View
          className="overflow-hidden rounded-b-[36px] bg-[#659BB9] px-5 pb-16"
          style={{ paddingTop: insets.top + 12 }}
        >
          <View className="absolute -right-10 -top-6 h-44 w-44 rounded-full bg-white/10" />
          <View className="absolute -left-12 bottom-2 h-32 w-32 rounded-full bg-white/10" />

          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-[14px] text-white/85">{formatToday()}</Text>
              <Text className="mt-0.5 text-[26px] font-extrabold text-white">
                {greeting()}, {SAMPLE_NAME}
              </Text>
            </View>
            <Pressable
              onPress={() => router.replace("/login")}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Log out"
              className="h-11 w-11 items-center justify-center rounded-full bg-white/20"
            >
              <Ionicons name="log-out-outline" size={22} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        <View className="-mt-12 px-5">
          {/* Today's progress card */}
          <View className="rounded-[24px] bg-white p-5 shadow-lg">
            <View className="flex-row items-end justify-between">
              <View>
                <Text className="text-[13px] font-semibold text-[#5F6F78]">
                  Today's progress
                </Text>
                <Text className="mt-1 text-[28px] font-extrabold text-[#1F2D36]">
                  {done} of {total} done
                </Text>
              </View>
              <Text className="text-[26px] font-extrabold text-[#659BB9]">
                {percent}%
              </Text>
            </View>
            <View
              accessibilityRole="progressbar"
              accessibilityValue={{ min: 0, max: 100, now: percent }}
              className="mt-3 h-3 overflow-hidden rounded-full bg-[#E8F1F6]"
            >
              <View
                className="h-full rounded-full bg-[#659BB9]"
                style={{ width: `${percent}%` }}
              />
            </View>
            <Text className="mt-2.5 text-[13px] text-[#5F6F78]">
              {total === 0
                ? "Nothing planned for today. Add a task to get started."
                : percent === 100
                  ? "All done for today. Nice work!"
                  : `${total - done} left to go. You've got this.`}
            </Text>
          </View>

          {/* Quick add */}
          <SectionHeader title="Quick add" />
          <View className="flex-row justify-between gap-3">
            {QUICK_ACTIONS.map((a) => (
              <Pressable
                key={a.label}
                disabled
                accessibilityRole="button"
                accessibilityState={{ disabled: true }}
                accessibilityLabel={`Add ${a.label} (coming soon)`}
                className="flex-1 items-center rounded-2xl bg-white py-3.5 opacity-50 shadow-sm"
              >
                <View className="h-11 w-11 items-center justify-center rounded-full bg-[#E8F1F6]">
                  <Ionicons name={a.icon} size={22} color="#4A7F9E" />
                </View>
                <Text className="mt-1.5 text-[13px] font-semibold text-[#1F2D36]">
                  {a.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Due today */}
          <SectionHeader title="Due today" count={today.length} />
          {today.length === 0 ? (
            <EmptyCard
              icon="sunny-outline"
              text="No tasks due today. Enjoy the free time!"
            />
          ) : (
            today.map((t) => <TaskRow key={t.id} task={t} onToggle={toggle} />)
          )}

          {/* Overdue */}
          {OVERDUE.length > 0 ? (
            <>
              <SectionHeader
                title="Overdue"
                count={OVERDUE.length}
                tone="danger"
              />
              {OVERDUE.map((t) => (
                <TaskRow key={t.id} task={t} />
              ))}
            </>
          ) : null}

          {/* Upcoming exams */}
          <SectionHeader title="Upcoming exams" count={EXAMS.length} />
          {EXAMS.length === 0 ? (
            <EmptyCard icon="school-outline" text="No exams coming up." />
          ) : (
            EXAMS.map((e) => (
              <View
                key={e.id}
                className="mb-2.5 flex-row items-center rounded-2xl bg-white p-3.5 shadow-sm"
              >
                <View
                  className="h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${e.color}26` }}
                >
                  <Text
                    className="text-[18px] font-extrabold"
                    style={{ color: e.color }}
                  >
                    {e.daysLeft}
                  </Text>
                  <Text
                    className="-mt-0.5 text-[10px] font-semibold"
                    style={{ color: e.color }}
                  >
                    days
                  </Text>
                </View>
                <View className="ml-3 flex-1">
                  <Text
                    numberOfLines={1}
                    className="text-[15px] font-semibold text-[#1F2D36]"
                  >
                    {e.title}
                  </Text>
                  <Text className="mt-0.5 text-[12px] text-[#5F6F78]">
                    {e.subject} · {e.date}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#9AA9B1" />
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
