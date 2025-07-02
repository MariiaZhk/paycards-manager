import { useState } from "react";
import { mockCards } from "../data/mockCards";
import type { Card } from "@/common/types";
import DataTable from "@/components/table/DataTable";
import CardFilter from "@/components/filter/CardsFilter";
import { NewCardDialog } from "@/components/dialog/NewCardDialog";

const MyCardsPage = () => {
  const [cards, setCards] = useState<Card[]>(mockCards);
  const [filter, setFilter] = useState("");

  const handleAddCard = (card: Card) => {
    setCards((prev) => [...prev, card]);
  };

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

  const filteredCards = cards.filter(
    (card) =>
      card.brand.toLowerCase().includes(filter.toLowerCase()) ||
      card.last4.includes(filter)
  );

  return (
    <div className="p-4 bg-[var(--color-card)] rounded-lg shadow-md max-w-[1200px] mx-auto my-6 ">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold">My Cards</h1>
        <div className="flex items-center gap-2">
          <CardFilter filterValue={filter} onFilterChange={setFilter} />
          <NewCardDialog onAdd={handleAddCard} />
        </div>
      </div>
      <DataTable
        cards={filteredCards}
        onDelete={handleDelete}
        onSetDefault={handleSetDefault}
      />
    </div>
  );
};

export default MyCardsPage;
