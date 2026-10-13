"use client"
import { CATEGORY_GAMES_DATA } from "@/fake-data/category";
import HotGames from "./HotGames";
import { SectionHeader } from "@/components/shared/SectionHeader";
import JackpotSection from "./JackpotSection";
import { useQuery } from "@tanstack/react-query";
import LoadingState from "@/components/shared/Loading";
import { getAllGames } from "@/services/games.service";

const AllCategory = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["games"],
    queryFn: ()=>getAllGames(),
  });

  if (isLoading) {
    return <LoadingState message="Games all " />;
  }
  console.log(data);
  return (
    <div className="w-full space-y-6">
      <HotGames data={CATEGORY_GAMES_DATA[0]} rows={2} />
      <JackpotSection data={CATEGORY_GAMES_DATA[1]} />
      {CATEGORY_GAMES_DATA?.slice(1).map((category, index) => (
        <SectionHeader
          key={index}
          title={category?.title}
          moreHref={category?.moreHref}
          games={category?.games}
          rows={index % 2 === 0 ? 1 : 2}
        />
      ))}
    </div>
  );
};

export default AllCategory;
