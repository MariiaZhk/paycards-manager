import { TableCell, TableRow } from "@/components/ui/table";
import type { Card } from "@/common/types";

interface CardTableRowProps {
  card: Card;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

const CardTableRow = ({ card, onDelete, onSetDefault }: CardTableRowProps) => (
  <TableRow>
    <TableCell className="capitalize">{card.brand}</TableCell>
    <TableCell>{card.last4}</TableCell>
    <TableCell>{card.isDefault ? "✅ Default" : ""}</TableCell>
    <TableCell className="space-x-2">
      {!card.isDefault && (
        <button
          onClick={() => onSetDefault(card.id)}
          className="text-blue-600 hover:underline"
        >
          Set as default
        </button>
      )}
      <button
        onClick={() => onDelete(card.id)}
        className="text-red-600 hover:underline"
      >
        Delete
      </button>
    </TableCell>
  </TableRow>
);

export default CardTableRow;
