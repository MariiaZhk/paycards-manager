import { useState } from "react";
import { mockCards } from "../data/mockCards";
import type { Card } from "@/common/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

const MyCardsPage = () => {
  const [cards, setCards] = useState<Card[]>(mockCards);

  const handleDelete = (id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setCards((prev) =>
      prev.map((card) => ({
        ...card,
        isDefault: card.id === id,
      }))
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Cards</h1>

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
            <TableRow key={card.id}>
              <TableCell className="capitalize">{card.brand}</TableCell>
              <TableCell>{card.last4}</TableCell>
              <TableCell>{card.isDefault ? "✅ Default" : ""}</TableCell>
              <TableCell className="space-x-2">
                {!card.isDefault && (
                  <button
                    onClick={() => handleSetDefault(card.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Set as default
                  </button>
                )}
                <button
                  onClick={() => handleDelete(card.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyCardsPage;
