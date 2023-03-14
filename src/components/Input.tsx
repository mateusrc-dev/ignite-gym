import { Input as NativeBaseInput, IInputProps } from "native-base"; // let's use alias to rename 'Input'

export function Input({ ...rest }: IInputProps) { // let's insert the 'input' typing
  return (
    <NativeBaseInput
      bg="gray.700"
      h={14}
      px={4}
      borderWidth={0}
      fontSize="md"
      color="white"
      fontFamily="body"
      mb={4}
      placeholderTextColor="gray.300"
      _focus={{
        bg: "gray.700",
        borderWidth: 1,
        borderColor: "green.500",
      }}
      {...rest}
    />
  );
}
// px is a padding in vertical
// mb = margin-bottom
