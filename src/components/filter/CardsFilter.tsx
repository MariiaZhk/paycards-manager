import { Input } from "@/components/ui/input";

interface CardFilterProps {
  filterValue: string;
  onFilterChange: (value: string) => void;
}

const CardFilter = ({ filterValue, onFilterChange }: CardFilterProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const cleanedValue = rawValue.replace(/\s/g, "");
    const isNumeric = /^\d*$/.test(cleanedValue);
    if (isNumeric && cleanedValue.length > 4) {
      return;
    }
    onFilterChange(rawValue);
  };

  return (
    <Input
      type="text"
      placeholder="Brand or last 4 digits"
      value={filterValue}
      onChange={handleChange}
      className="w-full"
    />
  );
};

export default CardFilter;
