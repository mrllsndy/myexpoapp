import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboardScroll } from "../hooks/useKeyboardScroll";

type Errors = { email?: string; password?: string; form?: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(email: string, password: string): Errors {
  const errors: Errors = {};
  if (!email.trim()) errors.email = "Enter your email address.";
  else if (!EMAIL_REGEX.test(email.trim()))
    errors.email = "That doesn't look like a valid email.";
  if (!password) errors.password = "Enter your password.";
  else if (password.length < 6)
    errors.password = "Password must be at least 6 characters.";
  return errors;
}

export default function Login() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { scrollRef, keyboardVisible, scrollToFocused } = useKeyboardScroll();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    const found = validate(email, password);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setLoading(true);
    try {
      // Milestone 3: replace with supabase.auth.signInWithPassword({ email, password })
      router.replace("/dashboard");
    } catch {
      setErrors({
        form: "Something went wrong. Check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#FFFCEF]">
      <StatusBar style="light" />
      <KeyboardAvoidingView className="flex-1" behavior="padding">
        <ScrollView
          ref={scrollRef}
          className="flex-1"
          contentContainerClassName="grow"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Hero: brand area, extends under the status bar */}
          <View
            className={`items-center justify-center overflow-hidden rounded-b-[44px] bg-[#659BB9] px-6 ${
              keyboardVisible ? "" : "min-h-[170px] flex-[2]"
            }`}
            style={{ paddingTop: insets.top + 16, paddingBottom: 56 }}
          >
            {/* soft decorative circles */}
            <View className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-white/10" />
            <View className="absolute -right-8 bottom-6 h-40 w-40 rounded-full bg-white/10" />

            <View className="h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-white shadow-md">
              <Ionicons name="school" size={38} color="#659BB9" />
            </View>
            <Text className="mt-3 text-[30px] font-extrabold text-white">
              StudySync
            </Text>
            <Text className="mt-1 text-center text-[15px] text-white/90">
              Plan smarter. Focus longer. Stay on track.
            </Text>
          </View>

          {/* Form card overlaps the hero */}
          <View
            className="-mt-10 flex-[3] px-6"
            style={{ paddingBottom: insets.bottom + 16 }}
          >
            <View className="rounded-[28px] bg-white p-5 shadow-lg">
              <Text className="text-[24px] font-bold text-[#1F2D36]">
                Welcome back
              </Text>
              <Text className="mb-4 mt-1 text-[14px] text-[#5F6F78]">
                Sign in to continue your study plan.
              </Text>

              {errors.form ? (
                <View
                  accessibilityRole="alert"
                  className="mb-3 flex-row items-center gap-2 rounded-xl bg-[#FDECEC] p-3"
                >
                  <Ionicons name="alert-circle" size={18} color="#C0392B" />
                  <Text className="flex-1 text-[13px] text-[#C0392B]">
                    {errors.form}
                  </Text>
                </View>
              ) : null}

              {/* Email */}
              <Text className="mb-1.5 text-[13px] font-semibold text-[#1F2D36]">
                Email
              </Text>
              <View
                className={`h-[52px] flex-row items-center gap-2 rounded-2xl border-[1.5px] bg-[#F4F9FC] px-4 ${
                  errors.email ? "border-[#C0392B]" : "border-[#D5E4EC]"
                }`}
              >
                <Ionicons name="mail-outline" size={20} color="#659BB9" />
                <TextInput
                  className="flex-1 text-[16px] text-[#1F2D36]"
                  placeholder="you@school.edu"
                  placeholderTextColor="#9AA9B1"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  textContentType="emailAddress"
                  value={email}
                  onChangeText={(t) => {
                    setEmail(t);
                    if (errors.email)
                      setErrors((e) => ({ ...e, email: undefined }));
                  }}
                  onFocus={scrollToFocused}
                  accessibilityLabel="Email address"
                />
              </View>
              {errors.email ? (
                <Text className="mt-1 text-[12px] text-[#C0392B]">
                  {errors.email}
                </Text>
              ) : null}

              {/* Password */}
              <Text className="mb-1.5 mt-4 text-[13px] font-semibold text-[#1F2D36]">
                Password
              </Text>
              <View
                className={`h-[52px] flex-row items-center gap-2 rounded-2xl border-[1.5px] bg-[#F4F9FC] px-4 ${
                  errors.password ? "border-[#C0392B]" : "border-[#D5E4EC]"
                }`}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#659BB9"
                />
                <TextInput
                  className="flex-1 text-[16px] text-[#1F2D36]"
                  placeholder="Your password"
                  placeholderTextColor="#9AA9B1"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="password"
                  textContentType="password"
                  value={password}
                  onChangeText={(t) => {
                    setPassword(t);
                    if (errors.password)
                      setErrors((e) => ({ ...e, password: undefined }));
                  }}
                  onSubmitEditing={handleSignIn}
                  onFocus={scrollToFocused}
                  accessibilityLabel="Password"
                />
                <Pressable
                  onPress={() => setShowPassword((s) => !s)}
                  hitSlop={12}
                  accessibilityRole="button"
                  accessibilityLabel={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#5F6F78"
                  />
                </Pressable>
              </View>
              {errors.password ? (
                <Text className="mt-1 text-[12px] text-[#C0392B]">
                  {errors.password}
                </Text>
              ) : null}

              <Pressable
                className="mt-3 self-end py-1"
                accessibilityRole="button"
                accessibilityLabel="Forgot password"
              >
                <Text className="text-[13px] font-semibold text-[#4A7F9E]">
                  Forgot password?
                </Text>
              </Pressable>

              {/* Sign in */}
              <Pressable
                onPress={handleSignIn}
                disabled={loading}
                accessibilityRole="button"
                accessibilityLabel="Sign in"
                className="mt-3 h-[54px] items-center justify-center rounded-2xl bg-[#659BB9] active:opacity-85"
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-[16px] font-bold text-white">
                    Sign in
                  </Text>
                )}
              </Pressable>
            </View>

            {/* Sign up */}
            <View className="mt-auto flex-row items-center justify-center pt-5">
              <Text className="text-[14px] text-[#5F6F78]">
                New to StudySync?{" "}
              </Text>
              <Pressable
                onPress={() => router.push("/signup")}
                hitSlop={10}
                accessibilityRole="link"
                accessibilityLabel="Create an account"
              >
                <Text className="text-[14px] font-bold text-[#4A7F9E]">
                  Create an account
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
