import { HydrateClient } from "@/trpc/server";
import { SmartFridge } from "@/app/_components/smartfridge";

export default async function Home() {
  return (
    <HydrateClient>
      <SmartFridge />
    </HydrateClient>
  );
}
