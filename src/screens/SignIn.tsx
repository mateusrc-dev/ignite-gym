import { VStack, Image, Text, Center, Heading } from "native-base"; // 'VStack' put one thing under another
import BackgroundImg from "@assets/background.png";
// import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
  return (
    <VStack flex={1} bg="gray.700" px={10}>
      <Image
        source={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode="contain"
        position="absolute" // for the image to be in the background
      />

      <Center my={24}>
        {/*<LogoSvg />*/}
        <Text color="gray.100" fontSize="sm">
          Treine sua mente e seu corpo
        </Text>
      </Center>

      <Center>
        <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
          Acesse sua conta
        </Heading>
        <Input
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input placeholder="Senha" secureTextEntry />
        <Button title="Acessar" />
      </Center>
    </VStack>
  );
}
// 'my' is for make margin in vertical // 'heading' change style of words - big
