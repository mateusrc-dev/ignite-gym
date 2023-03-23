import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import {
  Center,
  ScrollView,
  VStack,
  Skeleton,
  Text,
  Heading,
  useToast,
} from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
};

const profileSchema = yup.object({
  name: yup.string().required("Informe o nome."),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 dígitos.")
    .nullable()
    .transform((value) => (!!value ? value : null)), // 'nullable' é para aceitar o valor 'null' no campo -> we let's to back for value 'null' on case the inside of value are a empty string, with that this field not need validation
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref("password")], "A confirmação de senha não confere.")
    .when("password", {
      is: (Field: any) => Field, // verifying if the field password have content - the verification return a value boolean
      then: (schema) =>
        schema
          .nullable()
          .required("Informe a confirmação da senha.") // if true then this message will appear
          .transform((value) => (!!value ? value : null)), // the default of validation to did change, that's why we let's use transform here
    }),
});

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/mateusrc-dev.png"
  );

  const toast = useToast();
  const { user, updateUserProfile } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  async function handleChangeUserPhoto() {
    try {
      setPhotoIsLoading(true);
      const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // we let's defined typing of media
        quality: 1, // varies between 0 and 1
        aspect: [4, 4], // image will be square
        allowsEditing: true, // for the user to edit the image by selecting it
      });

      if (canceled) {
        return;
      }

      if (assets[0].uri) {
        const { size }: any = await FileSystem.getInfoAsync(assets[0].uri); // we let's get informations about image file - how size, for example
        if (size && size / 1024 / 1024 > 5) {
          // we let's transform bytes in mega-bytes
          return toast.show({
            title: '"Essa imagem é muito grande. Escolha uma de até 5MB."',
            placement: "top", // saying position of image
            bgColor: "red.500",
          });
        }
        setUserPhoto(assets[0].uri); // uri - have localization of image in mobile
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);

      const userUpdated = user;
      userUpdated.name = data.name; // we let's that because the email not to will updated

      await api.put("/users", data); // we can send 'data' this way because it was typed

      await updateUserProfile(userUpdated)
      toast.show({
        title: "Perfil atualizado com sucesso.",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível atualizar o perfil. Tente novamente mais tarde."
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton // let's use 'Skeleton' to create shapes similar to the components that are loading
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.400"
              endColor="gray.300"
            />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt="Foto do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleChangeUserPhoto}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Nome"
                bg="gray.600"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="E-mail"
                isDisabled
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </Center>

        <VStack px={10} mt={12} mb={12}>
          <Heading color="gray.200" fontSize="md" mb={2} fontFamily="heading">
            Alterar senha
          </Heading>
          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
            isLoading={isUpdating}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
