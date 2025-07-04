import { useEffect, useState } from "react";
import { mockCards } from "../data/mockCards";
import type { Card } from "@/common/types";
import DataTable from "@/components/table/DataTable";
import CardFilter from "@/components/filter/CardsFilter";
import { NewCardDialog } from "@/components/dialog/NewCardDialog";
import { ThemeToggler } from "@/components/theme-toggler/ThemeToggler";

const MyCardsPage = () => {
  const [filter, setFilter] = useState("");
  const [cards, setCards] = useState<Card[]>(() => {
    const saved = localStorage.getItem("cards");
    return saved ? JSON.parse(saved) : mockCards;
  });

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const handleAddCard = (card: Card) => {
    setCards((prev) => [...prev, card]);
    setFilter("");
  };

  const handleDelete = (id: string) => {
    setCards((prev) => {
      const newCards = prev.filter((c) => c.id !== id);
      const deletedCard = prev.find((c) => c.id === id);

      if (deletedCard?.isDefault && newCards.length > 0) {
        return newCards.map((card, index) => ({
          ...card,
          isDefault: index === 0,
        }));
      }

      return newCards;
    });
  };

  const handleSetDefault = (id: string) => {
    setCards((prev) =>
      prev.map((card) => ({
        ...card,
        isDefault: card.id === id,
      }))
    );
  };

  const normalizedFilter = filter.replace(/\s/g, "").toLowerCase();

  const filteredCards = cards.filter((card) => {
    const brand = card.brand.replace(/\s/g, "").toLowerCase();
    const last4 = card.last4;

    return (
      brand.includes(normalizedFilter) || last4.startsWith(normalizedFilter)
    );
  });

  return (
    <>
      <div className="p-10 bg-[var(--color-card)] rounded-lg shadow-md max-w-[1000px] mx-auto my-6 ">
        <div className="flex items-baseline justify-between mb-6">
          <h1 className="text-2xl font-bold">My Cards</h1>
          <div className="flex items-center gap-2">
            <CardFilter filterValue={filter} onFilterChange={setFilter} />{" "}
            <ThemeToggler />
            <NewCardDialog onAdd={handleAddCard} />
          </div>
        </div>
        {filteredCards.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">
            No cards match your search. Please try a different brand or the last
            4 digits.
          </p>
        ) : (
          <DataTable
            cards={filteredCards}
            onDelete={handleDelete}
            onSetDefault={handleSetDefault}
          />
        )}
      </div>
    </>
  );
};

export default MyCardsPage;
