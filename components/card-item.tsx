import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { lotrTcgSets } from "@/lib/constants";

type LotrCard = {
  id: number;
  card_id: string;
  card_name: string;
  card_image: string | null;
  set_name: string | null;
  set_id: string | null;
  rarity: string;
  card_number: string | null;
  card_type: string | null;
  type: string | null;
  subtype: string | null;
  game_text: string | null;
  flavor_text: string | null;
  twilight: number | null;
  strength: number | null;
  vitality: number | null;
  kind: string | null;
  resistance: number | null;
  culture: string | null;
  home_site: string | null;
  created_at: string;
};

export default function CardItem({ card }: { card: LotrCard }) {
  const setName = card.set_id
    ? lotrTcgSets[Number.parseInt(card.set_id)] || "Unknown Set"
    : "Unknown Set";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="p-4 pb-2">
            <h3 className="font-bold text-lg line-clamp-1">{card.card_name}</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              <Badge variant="outline">{setName}</Badge>
              {card.rarity && <Badge variant="secondary">{card.rarity}</Badge>}
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2 pb-2 flex-grow">
            <div className="aspect-[2/3] relative mb-3 bg-muted rounded-md overflow-hidden">
              {card.card_id ? (
                <Image
                  src={"/images/" + card.card_id + ".jpg"}
                  alt={card.card_name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=300&width=200"
                    alt="Card placeholder"
                    width={300}
                    height={400}
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full p-4">
        <DialogTitle>{card.card_name}</DialogTitle>
        <Image
          src={"/images/" + card.card_id + ".jpg"}
          alt={card.card_name}
          width={300}
          height={400}
          className="rounded-md mx-auto"
        />
        <div className="text-sm mt-4">
          <p>
            <span className="font-bold">Set:</span> {setName}
          </p>
          {card.rarity && (
            <p>
              <span className="font-bold">Rarity:</span> {card.rarity}
            </p>
          )}
          {card.type && (
            <p>
              <span className="font-bold">Type:</span> {card.type}
            </p>
          )}
          {card.game_text && (
            <p className="mt-2 text-muted-foreground">{card.game_text}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
