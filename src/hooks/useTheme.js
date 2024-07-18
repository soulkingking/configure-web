import { useDark, useToggle } from '@vueuse/core';

export function useTheme() {
  const isDark = useDark({
    selector: document.documentElement,
    attribute: 'theme-mode',
    valueDark: 'dark',
    valueLight: 'light'
  });

  const toggleDark = useToggle(isDark);

  return {
    isDark,
    toggleDark
  };
}
