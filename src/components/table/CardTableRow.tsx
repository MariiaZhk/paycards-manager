import type { Card } from "@/common/types";
import { Button } from "@/components/ui/Button/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { FaTrashCan } from "react-icons/fa6";
import { ImRadioChecked2 } from "react-icons/im";

interface CardTableRowProps {
  card: Card;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

const CardTableRow = ({ card, onDelete, onSetDefault }: CardTableRowProps) => {
  return (
    <TableRow>
      <TableCell>{card.brand}</TableCell>
      <TableCell>{card.last4}</TableCell>

      <TableCell>
        <Button
          variant="ghost"
          onClick={() => !card.isDefault && onSetDefault(card.id)}
          // disabled={card.isDefault}
          size="sm"
          className={`flex items-center justify-start gap-2 ${
            card.isDefault
              ? "text-[var(--checked)]"
              : "text-[var(--checked)]/20"
          }`}
        >
          <ImRadioChecked2
            className={
              card.isDefault
                ? "color-[var(--checked)]"
                : "color-[var(--checked)]/20"
            }
          />
          Default
        </Button>
      </TableCell>

      <TableCell>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(card.id)}
          className="flex items-center justify-start gap-2 "
        >
          <FaTrashCan />
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CardTableRow;
