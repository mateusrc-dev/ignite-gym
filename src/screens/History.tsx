import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Heading, Text, VStack } from "native-base";
import { SectionList } from "native-base";
import { useState } from "react";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: "26.08.2023",
      data: ["Puxada frontal", "Remanda unilateral"],
    },
    {
      title: "27.08.2023",
      data: ["Puxada frontal"],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList // this list separate data by titles - view state 'exercises'
        sections={exercises} // inserting array of data
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />} // render component
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {section.title}
          </Heading>
        )} // render Header of list
        px={8}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: "center" }
        }
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Não há exercícios registrados ainda. {"\n"} Vamos fazer exercícios
            hoje?
          </Text>
        )}
      />
    </VStack>
  );
}
