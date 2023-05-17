import { FC } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ButtonType, CButtonProps } from "types/button.types";

import "./c-button.scss";

const CButton: FC<CButtonProps> = ({
  onClick,
  value,
  iconName,
  testid,
  variant = ButtonType.Secondary,
  disabled = false,
}) => {
  return (
    <button
      type="submit"
      className={classNames("c-button", variant, { disabled: disabled })}
      onClick={onClick}
      aria-disabled={disabled}
      data-testid={testid}
    >
      {iconName && <FontAwesomeIcon className="button-icon" icon={iconName} size="lg" />}
      {value && <span className="c-button-input">{value}</span>}
    </button>
  );
};

export default CButton;
