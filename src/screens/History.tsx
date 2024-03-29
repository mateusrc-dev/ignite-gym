import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import moment from "moment";
import { Heading, Text, useToast, VStack } from "native-base";
import { SectionList } from "native-base";
import { useCallback, useEffect, useState } from "react";
import {
  tagLastDayExerciseRealized,
  tagLastWeekCountExercises,
} from "@notifications/notificationsTags";

export function History() {
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [countExercisesInWeek, setCountExercisesInWeek] = useState<number>(0);
  const toast = useToast();

  useEffect(() => {
    if (exercises[0]?.data) {
      const exercise = exercises[0]?.data[0];
      const dateNow = new Date();
      const dateExercise = String(exercise.created_at).split(" ");
      const arrayDateExercise = dateExercise[0].split("-");
      const dateExerciseMoment = moment([
        Number(arrayDateExercise[0]),
        Number(arrayDateExercise[1]) - 1,
        Number(arrayDateExercise[2]),
      ]);

      const difference = moment(dateNow).diff(dateExerciseMoment, "days");
      tagLastDayExerciseRealized(String(difference));

      const firstDayOfDate = moment(dateNow).weekday(0);
      console.log(moment(exercise.created_at).isAfter(firstDayOfDate));
      console.log(firstDayOfDate);

      let countExercises: number = 0;
      for (var x = 0; x < exercises.length; x++) {
        const result = exercises[x].data.filter((exercise) =>
          moment(exercise.created_at).isAfter(firstDayOfDate)
        );
        countExercises += result.length;
      }

      console.log(countExercises);
      tagLastWeekCountExercises(String(countExercises));
    }
  }, [exercises]);

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get("/history");
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o histórico.";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList // this list separate data by titles - view state 'exercises'
          sections={exercises} // inserting array of data
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />} // render component
          renderSectionHeader={({ section }) => (
            <Heading
              color="gray.200"
              fontSize="md"
              mt={10}
              mb={3}
              fontFamily="heading"
            >
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
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  );
}
