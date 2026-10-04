import {
  GameCardContainer,
  GameCardMedia,
  GameCardPlayOverlay,
  GameCardFooter,
} from "@/components/ui/game-card-design";
import { Game } from "@/fake-data/category";

export function GameCard({ game }: { game: Game }) {
  return (
    <GameCardContainer>
      <GameCardMedia src={"#"} alt={game.title}>
        {/* {game.isFreeTrial ? (
          <GameCardBadge variant="trial">FREE TRIAL</GameCardBadge>
        ) : game.tag ? (
          <GameCardBadge variant={game.tag}>{game.tag}</GameCardBadge>
        ) : null} */}

        {/* Dynamic Hover Buttons */}
        <GameCardPlayOverlay
          isFreeTrial={game.isFreeTrial}
          onPlay={() => console.log("Play Real Game:", game.id)}
          onTrial={() => console.log("Launch Free Demo:", game.id)}
        />
      </GameCardMedia>

      <GameCardFooter title={game.title} provider={game.provider} />
    </GameCardContainer>
  );
}
