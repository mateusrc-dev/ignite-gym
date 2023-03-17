import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { HStack, VStack, FlatList, Heading, Text } from "native-base";
import { useState } from "react";

export function Home() {
  const [groups, setGroups] = useState(["costa", "bíceps", "tríceps", "ombro"]);
  const [groupSelected, setGroupSelected] = useState<string>("costas");

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            onPress={() => setGroupSelected(item)}
            isActive={groupSelected === item}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
      />
      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            4
          </Text>
        </HStack>
        
        <ExerciseCard />
        <ExerciseCard />

      </VStack>
    </VStack>
  );
}
// my = margin-top / margin-bottom
// maxH = max-height
// px = margin-left / margin-right