import { Input } from "@/components/ui/input";

interface CardFilterProps {
  filterValue: string;
  onFilterChange: (value: string) => void;
}

const CardFilter = ({ filterValue, onFilterChange }: CardFilterProps) => {
  return (
    <div>
      <Input
        type="text"
        placeholder="Filter by brand or last 4 digits"
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
};

export default CardFilter;
