import { useState } from "react";
import { mockCards } from "../data/mockCards";
import type { Card } from "@/common/types";
import DataTable from "@/components/table/DataTable";

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
    <div className="p-4 bg-[var(--color-card)] rounded-lg shadow-md overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">My Cards</h1>
      <DataTable
        cards={cards}
        onDelete={handleDelete}
        onSetDefault={handleSetDefault}
      />
    </div>
  );
};

export default MyCardsPage;
