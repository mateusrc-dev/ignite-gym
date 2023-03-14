import { VStack, Image, Text, Center } from "native-base"; // 'VStack' put one thing under another
import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";

export function SignIn() {
  return (
    <VStack flex={1} bg="gray.700">
      <Image
        source={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode="contain"
        position="absolute" // for the image to be in the background
      />

      <Center my={24}>
        <LogoSvg />
        <Text color="gray.100" fontSize="sm">
          Treine sua mente e seu corpo
        </Text>
      </Center>
    </VStack>
  );
}
// 'my' is for make margin in vertical
