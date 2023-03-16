import { Image, IImageProps } from "native-base";

type Props = IImageProps & {
  size?: number;
};

export function UserPhoto({ size = 16, ...rest }: Props) {
  return (
    <Image
      {...rest}
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
    />
  );
}

// h = height
// w = width
// rounded = border-radius
