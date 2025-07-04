import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/providers/theme/useTheme";

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      aria-label="Toggle theme"
    />
  );
}
