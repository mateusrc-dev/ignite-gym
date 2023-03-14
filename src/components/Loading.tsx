import { Center, Spinner } from "native-base"; // 'center' component is like 'view' component, because it has similar action

export function Loading() {
  return (
    <Center flex={1} bg="gray.700">
      <Spinner color="green.500" />
    </Center>
  );
}
