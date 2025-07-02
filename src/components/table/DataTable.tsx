import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table/table";
import type { Card } from "@/common/types";
import CardTableRow from "./CardTableRow";

interface CardTableProps {
  cards: Card[];
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

const DataTable = ({ cards, onDelete, onSetDefault }: CardTableProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Brand</TableHead>
        <TableHead>Last4</TableHead>
        <TableHead>Default</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {cards.map((card) => (
        <CardTableRow
          key={card.id}
          card={card}
          onDelete={onDelete}
          onSetDefault={onSetDefault}
        />
      ))}
    </TableBody>
  </Table>
);

export default DataTable;
