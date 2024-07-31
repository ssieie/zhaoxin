import { inject, ref, watch } from "vue";

export function useThemeChange() {
  const { theme }: any = inject("theme");

  const headerBg = ref(true);

  watch(
    () => theme.value,
    () => {
      headerBg.value = false;
      setTimeout(() => {
        headerBg.value = true;
      }, 330);
    },
  );

  return {
    headerBg,
    theme,
  };
}
