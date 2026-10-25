import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type ComponentRef,
} from "react";
import { Keyboard, ScrollView, TextInput } from "react-native";

/**
 * Keeps the focused input visible above the keyboard.
 * - scrollRef: attach to the screen's <ScrollView ref={scrollRef}>
 * - keyboardVisible: true while the keyboard is open (used to shrink the header)
 * - scrollToFocused: call from each input's onFocus
 */
export function useKeyboardScroll(offset = 120) {
  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const scrollToFocused = useCallback(() => {
    // Wait a moment so the keyboard and layout have finished moving
    setTimeout(() => {
      const input = (TextInput as any).State?.currentlyFocusedInput?.();
      const scroll = scrollRef.current as any;
      const inner = scroll?.getInnerViewRef?.() ?? scroll?.getInnerViewNode?.();
      if (!input || !inner) return;
      input.measureLayout(
        inner,
        (_x: number, y: number) => {
          scrollRef.current?.scrollTo({
            y: Math.max(y - offset, 0),
            animated: true,
          });
        },
        () => {},
      );
    }, 150);
  }, [offset]);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
      scrollToFocused();
    });
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, [scrollToFocused]);

  return { scrollRef, keyboardVisible, scrollToFocused };
}
