import React from "react";
import getLayout, { getHomeLayoutId } from "@/lib/queries/getHomeLayout";
import getUtils from "@/lib/queries/getUtils";
import BannerBlock from "@/components/home/Layout/BannerBlock";
import ItemGroupBlock from "@/components/home/Layout/ItemGroupBlock";
import MubadaraBlock from "@/components/home/Layout/MubadaraBlock";
import ItemBlock from "@/components/home/Layout/ItemBlock";
import LocationSelection from "@/components/LocationSelection/LocationSelection";

async function HomePage() {
  const data = await getUtils();
  const homeLayoutId = await getHomeLayoutId();
  const layoutData = await getLayout(homeLayoutId as string);

  const renderBlock = (block: any) => {
    switch (block.block_type) {
      case "Banner":
        return <BannerBlock key={block.block_id} block={block} />;
      case "Item Group":
        return <ItemGroupBlock key={block.block_id} block={block} />;
      case "Mubadara":
        return <MubadaraBlock key={block.block_id} block={block} />;
      case "Item":
        return <ItemBlock key={block.block_id} block={block} />;
      default:
        return null;
    }
  };

  return (
    <div className="py-8 max-w-[1680px] mx-auto">
      {layoutData?.data.data.map((block: any) => renderBlock(block))}
      <LocationSelection />
    </div>
  );
}

export default HomePage;
