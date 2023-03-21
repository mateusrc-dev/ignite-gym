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
import { useForm, Controller } from "react-hook-form"; // we let's use 'useForm' for create the our form - Controller is responsibility controller the inputs
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";

type FormDataProps = {
  // we let's defined typing of form
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  // we let's defined modeling of data the our applic ation
  name: yup.string().required("Informe o nome."),
  email: yup.string().required("Informe o e-mail.").email("Email inválido."),
  password: yup
    .string()
    .required("Informe a sua senha.")
    .min(6, "A senha tem que ter no mínimo 6 caracteres."),
  password_confirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password")], "A confirmação da senha não confere."),
});

export function SignUp() {
  const navigation = useNavigation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth()

  const {
    control,
    handleSubmit, // handleSubmit = helps us access the values ​​of form inputs
    formState: { errors }, // in formState exist the errors of our form
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema), // we will say what's schema we to go use
    defaultValues: {
      // we let's defined default values of inputs
      name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
  });

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      setIsLoading(true)
      await api.post("/users", { name, email, password });
      await signIn(email, password)
    } catch (error) {
      setIsLoading(false)
      const isAppError = error instanceof AppError; // case to will true, then this error is treated
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
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
            Crie sua conta
          </Heading>

          <Controller
            control={control} // the 'control' says which form this 'input' will be controlled by
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )} // component which will be rendered
          />

          <Controller
            control={control} // the 'control' says which form this 'input' will be controlled by
            name="email"
            render={(
              { field: { onChange, value } } // we let's use onChange is because the change of 'input' now is controlled by our form
            ) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )} // component which will be rendered
          />

          <Controller
            control={control} // the 'control' says which form this 'input' will be controlled by
            name="password"
            render={(
              { field: { onChange, value } } // we let's use onChange is because the change of 'input' now is controlled by our form
            ) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )} // component which will be rendered
          />

          <Controller
            control={control} // the 'control' says which form this 'input' will be controlled by
            name="password_confirm"
            render={(
              { field: { onChange, value } } // we let's use onChange is because the change of 'input' now is controlled by our form
            ) => (
              <Input
                placeholder="Confirme a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)} // for to be possible send data in button of keyboardd
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )} // component which will be rendered
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>

        <Button
          title="Voltar para o login"
          variant="outline"
          mt={12}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}
// 'my' is for make margin in vertical // 'heading' change style of words - big
// mb = margin-bottom - mt = margin-top
// px = padding vertical
// 'variant' is an existing property on the component's button, we can access it because we use Button typing in the component
// we use 'flexGrow' for padding all screen
