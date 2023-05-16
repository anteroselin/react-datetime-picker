export interface DayProps {
  filled?: boolean;
  outlined?: boolean;
  disabled?: boolean;
  highlighted?: boolean;
  isCurrentMonth?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  value: Date;
}
