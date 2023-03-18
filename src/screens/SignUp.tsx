import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base"; // 'VStack' put one thing under another
import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form"; // we let's use 'useForm' for create the our form - Controller is responsibility controller the inputs

type FormDataProps = {
  // we let's defined typing of form
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

export function SignUp() {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors }, // in formState exist the errors of our form
  } = useForm<FormDataProps>({
    // handleSubmit = helps us access the values ​​of form inputs
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

  function handleSignUp({
    name,
    email,
    password,
    password_confirm,
  }: FormDataProps) {
    console.log({ name, email, password, password_confirm });
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
            rules={{
              // rules of input - if not follow, to will give error - form data is not submitted
              required: "Esse campo é obrigatório, informe seu nome!",
            }}
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
            rules={{
              // rules of input - if not follow, to will give error
              required: "Esse campo é obrigatório, informe seu email!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // verifying if the content this input are conform with format email - this is a regex
                message: "E-mail inválido",
              },
            }}
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
              />
            )} // component which will be rendered
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Button
          title="Voltar para o login"
          variant="outline"
          mt={24}
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
