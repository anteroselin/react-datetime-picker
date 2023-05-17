import { MouseEvent } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
  BorderLess = "borderless",
}

export interface CButtonProps {
  value: string;
  disabled?: boolean;
  iconName?: IconDefinition;
  variant?: ButtonType;
  testid?: string;
  onClick: (evt: MouseEvent<HTMLButtonElement>) => void;
}
