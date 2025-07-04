import { useEffect, useState } from "react";
import { mockCards } from "@/data/mockCards";
import type { Card } from "@/common/types";
import DataTable from "@/components/table/DataTable";
import CardFilter from "@/components/filter/CardsFilter";
import { NewCardDialog } from "@/components/dialog/NewCardDialog";
import { ThemeToggler } from "@/components/theme-toggler/ThemeToggler";

const MyCardsPage = () => {
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("cards");
    const initialCards = saved ? JSON.parse(saved) : mockCards;

    const timeoutId = setTimeout(() => {
      setCards(initialCards);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("cards", JSON.stringify(cards));
    }
  }, [cards, loading]);

  const handleAddCard = (card: Card) => {
    setCards((prev) => {
      const updated = [...prev, { ...card, isDefault: prev.length === 0 }];
      return updated;
    });
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
      <div className="w-full p-8 bg-[var(--color-card)] rounded-lg shadow-lg max-w-[90%] lg:max-w-[900px] mx-auto my-8">
        <div className="flex flex-col  md:items-baseline md:justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-end justify-between gap-2 w-full">
            <h1 className="text-2xl font-bold self-center">My Cards</h1>
            <div className="flex gap-2 items-center">
              <ThemeToggler />
              <NewCardDialog onAdd={handleAddCard} />
            </div>
          </div>
          <div className="w-full max-w-lg">
            <CardFilter filterValue={filter} onFilterChange={setFilter} />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground py-6">Loading...</p>
        ) : cards.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">
            You haven't added any cards yet.
          </p>
        ) : filteredCards.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">
            No cards match your search. Try a different brand or the last 4
            digits.
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
