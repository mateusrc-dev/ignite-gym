declare module "*.svg" { // to say that the svg will be a react component
  import React from 'react';
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}