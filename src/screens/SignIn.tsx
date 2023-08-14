import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
} from "native-base"; // 'VStack' put one thing under another
import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>(); // we let's defined typing auth routes - for to appear options routes in code
  const { signIn } = useAuth();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message // let's show the backend error message
        : "Não foi possível entrar. Tente novamente mais tarde.";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
      setIsLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg} // we let's defined default image - to carrying more fast
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

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>
          <Controller
            control={control}
            name="email"
            rules={{ required: "Informe o e-mail" }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: "Informe a senha" }}
            render={({ field: { onChange } }) => (
              <Input
                secureTextEntry
                placeholder="Senha"
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            title="Acessar"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </Center>
        <Center mt={24}>
          <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar conta"
            variant="outline"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
// 'my' is for make margin in vertical // 'heading' change style of words - big
// mb = margin-bottom - mt = margin-top
// px = padding vertical
// 'variant' is an existing property on the component's button, we can access it because we use Button typing in the component
// we use 'flexGrow' for padding all screen
