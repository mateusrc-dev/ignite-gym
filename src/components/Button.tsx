import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
};

export function Button({ title, ...props }: Props) {
  return (
    <ButtonNativeBase
      {...props}
      w="full"
      h={14}
      bg="green.700"
      rounded="sm"
      _pressed={{ bg: "green.500" }}
    >
      <Text color="white" fontFamily="heading" fontSize="sm">
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
// 'pressed' sets the style of the button when selecting
//rounded = border-radius