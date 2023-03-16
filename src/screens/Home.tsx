import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { HStack, VStack } from "native-base";
import { useState } from "react";

export function Home() {
  const [groupSelected, setGroupSelected] = useState<string>("costas");

  return (
    <VStack flex={1}>
      <HomeHeader />
      <HStack>
        <Group
          name="costas"
          onPress={() => setGroupSelected("costas")}
          isActive={groupSelected === "costas"}
        />
        <Group
          name="ombros"
          onPress={() => setGroupSelected("ombros")}
          isActive={groupSelected === "ombros"}
        />
      </HStack>
    </VStack>
  );
}
