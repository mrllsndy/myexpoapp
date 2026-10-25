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
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Field } from "../components/ui/Field";
import { validateSignup, type SignupErrors } from "../features/auth/validation";
import { useKeyboardScroll } from "../hooks/useKeyboardScroll";

export default function Signup() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { scrollRef, keyboardVisible, scrollToFocused } = useKeyboardScroll();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [loading, setLoading] = useState(false);

  const clear = (key: keyof SignupErrors) =>
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));

  const handleSignUp = async () => {
    const found = validateSignup(name, email, password, confirm);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setLoading(true);
    try {
      // Milestone 3: replace with supabase.auth.signUp({ email, password, options: { data: { display_name: name } } })
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
          {/* Hero */}
          <View
            className={`items-center justify-center overflow-hidden rounded-b-[44px] bg-[#659BB9] px-6 ${
              keyboardVisible ? "min-h-[110px]" : "min-h-[140px] flex-[1]"
            }`}
            style={{ paddingTop: insets.top + 12, paddingBottom: 52 }}
          >
            <View className="absolute -left-10 top-8 h-28 w-28 rounded-full bg-white/10" />
            <View className="absolute -right-8 bottom-4 h-36 w-36 rounded-full bg-white/10" />

            <Pressable
              onPress={() => router.back()}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              className="absolute left-5 h-10 w-10 items-center justify-center rounded-full bg-white/20"
              style={{ top: insets.top + 8 }}
            >
              <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
            </Pressable>

            <Text className="text-[28px] font-extrabold text-white">
              Create account
            </Text>
            <Text className="mt-1 text-center text-[15px] text-white/90">
              Join StudySync and start planning.
            </Text>
          </View>

          {/* Form card */}
          <View
            className="-mt-10 flex-[3] px-6"
            style={{ paddingBottom: insets.bottom + 16 }}
          >
            <View className="rounded-[28px] bg-white p-5 shadow-lg">
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

              <Field
                label="Full name"
                icon="person-outline"
                placeholder="Juan Dela Cruz"
                onFocus={scrollToFocused}
                autoCapitalize="words"
                autoComplete="name"
                textContentType="name"
                value={name}
                error={errors.name}
                onChangeText={(t) => {
                  setName(t);
                  clear("name");
                }}
              />

              <Field
                label="Email"
                icon="mail-outline"
                placeholder="you@school.edu"
                onFocus={scrollToFocused}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
                value={email}
                error={errors.email}
                onChangeText={(t) => {
                  setEmail(t);
                  clear("email");
                }}
              />

              <Field
                label="Password"
                icon="lock-closed-outline"
                placeholder="At least 6 characters"
                onFocus={scrollToFocused}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="new-password"
                textContentType="newPassword"
                value={password}
                error={errors.password}
                onChangeText={(t) => {
                  setPassword(t);
                  clear("password");
                }}
                right={
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
                }
              />

              <Field
                label="Confirm password"
                icon="shield-checkmark-outline"
                placeholder="Re-enter your password"
                onFocus={scrollToFocused}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="new-password"
                textContentType="newPassword"
                value={confirm}
                error={errors.confirm}
                onChangeText={(t) => {
                  setConfirm(t);
                  clear("confirm");
                }}
                onSubmitEditing={handleSignUp}
              />

              <Pressable
                onPress={handleSignUp}
                disabled={loading}
                accessibilityRole="button"
                accessibilityLabel="Create account"
                className="mt-1 h-[54px] items-center justify-center rounded-2xl bg-[#659BB9] active:opacity-85"
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-[16px] font-bold text-white">
                    Create account
                  </Text>
                )}
              </Pressable>
            </View>

            {/* Back to login */}
            <View className="mt-auto flex-row items-center justify-center pt-5">
              <Text className="text-[14px] text-[#5F6F78]">
                Already have an account?{" "}
              </Text>
              <Pressable
                onPress={() => router.replace("/login")}
                hitSlop={10}
                accessibilityRole="link"
                accessibilityLabel="Sign in"
              >
                <Text className="text-[14px] font-bold text-[#4A7F9E]">
                  Sign in
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
