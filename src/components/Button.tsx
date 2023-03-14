import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
};

export function Button({ title, variant, ...props }: Props) {
  return (
    <ButtonNativeBase
      {...props}
      w="full"
      h={14}
      bg={variant === "outline" ? "trasnparent" : "green.700"}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor="green.500"
      rounded="sm"
      _pressed={{ bg: variant === "outline" ? "gray.500" : "green.500" }}
    >
      <Text color={variant === "outline" ? "green.500" : "white"} fontFamily="heading" fontSize="sm">
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
// 'pressed' sets the style of the button when selecting
// rounded = border-radius
// we can use this property 'variant' for create styles with conditions