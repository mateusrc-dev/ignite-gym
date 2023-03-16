import { Heading, HStack, Icon, Text, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons"; // we have access to several icon libraries
import { UserPhoto } from "./UserPhoto";
import { TouchableOpacity } from "react-native";

export function HomeHeader() {
  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={{ uri: "https://github.com/mateusrc-dev.png" }}
        alt="imagem do usuário"
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,{" "}
        </Text>
        <Heading color="gray.100" fontSize="md">
          Rodrigo
        </Heading>
      </VStack>
      <TouchableOpacity>
      <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}

// HStack - arrange elements horizontally
// pt = padding-top
// pb = padding-bottom
// px = padding-left / padding-right
// mr = margin-right
// as = telling which library the icon will use
