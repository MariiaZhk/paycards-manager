import type { Card } from "@/common/types";
import CardTableRow from "./CardTableRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CardTableProps {
  cards: Card[];
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

const DataTable = ({ cards, onDelete, onSetDefault }: CardTableProps) => (
  <div className="w-full overflow-x-auto">
    <Table className="w-full min-w-[400px]">
      <TableHeader>
        <TableRow>
          <TableHead>Brand</TableHead>
          <TableHead className="w-30">Last4</TableHead>
          <TableHead className="w-32">Default</TableHead>
          <TableHead className="w-32">Actions</TableHead>
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
  </div>
);

export default DataTable;
