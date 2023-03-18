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
import { Alert, TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/mateusrc-dev.png"
  );

  const toast = useToast();

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
        if (size && size / 1024 / 1024 > 3) {
          // we let's transform bytes in mega-bytes
          return toast.show({
            title: '"Essa imagem é muito grande. Escolha uma de até 5MB."',
            placement: "top", // saying position of image
            bgColor: 'red.500',
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

          <Input placeholder="Nome" bg="gray.600" />
          <Input
            value="mateus_raimundo95@outlook.com"
            bg="gray.600"
            isDisabled
          />
        </Center>

        <VStack px={10} mt={12} mb={12}>
          <Heading color="gray.200" fontSize="md" mb={2}>
            Alterar senha
          </Heading>
          <Input bg="gray.600" placeholder="Senha antiga" secureTextEntry />
          <Input bg="gray.600" placeholder="Nova senha" secureTextEntry />
          <Input
            bg="gray.600"
            placeholder="Confirme a nova senha"
            secureTextEntry
          />
          <Button title="Atualizar" mt={4} />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
