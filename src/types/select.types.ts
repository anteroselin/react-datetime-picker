export interface SelectableItem {
  value: string;
  label: string;
  selected?: boolean;
}

export interface CSelectProps {
  options: SelectableItem[];
  placeholder?: string;
  defaultOption?: SelectableItem[];
  mandatoryValueOptions?: string[];
  value?: SelectableItem[];
  isMulti?: boolean;
  isSearchable?: boolean;
  onSelected?: (item: SelectableItem) => void;
}
