import React, { useEffect, useState, useMemo } from "react";
import Select, { components, GroupBase, MultiValue, MultiValueRemoveProps, SingleValue } from "react-select";
import _ from "lodash";

import { CSelectProps, SelectableItem } from "types/select.types";

import colors from "common.scss";

const MultiValueRemove = (props: MultiValueRemoveProps<SelectableItem, boolean, GroupBase<SelectableItem>>) => {
  if (!props.data || !props.data.value) {
    return null;
  }
  if (props.data.value.toLowerCase() === "user") {
    return null;
  }
  return <components.MultiValueRemove {...props} />;
};

const CSelect = React.forwardRef<any, CSelectProps>(function CFSelect(
  {
    options,
    placeholder,
    defaultOption = [],
    mandatoryValueOptions = [],
    isSearchable = false,
    isMulti = false,
    value,
    onSelected,
  }: CSelectProps,
  ref
) {
  const [selectedItems, setSelectedItems] = useState<SelectableItem[]>();

  useEffect(() => {
    if (!selectedItems && !_.isEqual(selectedItems, defaultOption)) {
      setSelectedItems(defaultOption);
    }
  }, [defaultOption, selectedItems]);

  useEffect(() => {
    setSelectedItems(value);
  }, [value]);

  const handleSelectedChange = (newValue: SingleValue<SelectableItem> | MultiValue<SelectableItem>) => {
    if (isMulti && Array.isArray(mandatoryValueOptions)) {
      let newValuesWithMandatory = [...(newValue as SelectableItem[])];

      if (newValuesWithMandatory.length < mandatoryValueOptions.length) {
        newValuesWithMandatory = [
          ...newValuesWithMandatory,
          ...mandatoryValueOptions.map((value) => ({ value, label: value })),
        ];
      }

      setSelectedItems(newValuesWithMandatory);
    } else {
      setSelectedItems([newValue as SelectableItem]);
    }

    if (!isMulti && onSelected) {
      onSelected(newValue as SelectableItem);
    }
  };

  const stringifiedOptions = useMemo(
    () => options.map((option) => ({ ...option, label: `${option.label}` })),
    [options]
  );

  return (
    <Select
      ref={ref}
      isMulti={isMulti}
      isSearchable={isSearchable}
      value={selectedItems}
      placeholder={placeholder ?? ""}
      components={{
        IndicatorSeparator: () => null,
        MultiValueRemove,
      }}
      options={stringifiedOptions}
      onChange={handleSelectedChange}
      styles={{
        multiValue: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: colors.primary,
          padding: "3px",
          borderRadius: "24px",
          border: `1px solid ${colors.primary}`,
        }),
        multiValueLabel: (baseStyles) => ({
          ...baseStyles,
          fontSize: "14px",
          fontWeight: 600,
          color: colors.dark100,
        }),
        multiValueRemove: (baseStyles) => ({
          ...baseStyles,
          color: colors.dark100,
        }),
        container: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: colors.dark100,
        }),
        control: (baseStyles, state) => ({
          ...baseStyles,
          minHeight: "40px",
          borderRadius: "6px",
          border: `1px solid ${state.isFocused ? colors.primary : colors.dark65}`,
          color: colors.dark30,
          backgroundColor: colors.dark100,
          boxShadow: state.isFocused ? `0px 0px 6px 0px rgba(${colors.primary}, 0.25)` : "none",
          "&:hover": {
            border: `1px solid ${colors.primary}`,
            boxShadow: `0px 0px 6px 0px rgba(${colors.primary}, 0.25)`,
          },
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          textAlign: "left",
          color: colors.dark30,
          backgroundColor: colors.dark100,
          fontWeight: "600",
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: colors.dark90,
          zIndex: 10000,
        }),
        valueContainer: (baseStyles) => ({
          ...baseStyles,
          color: colors.dark30,
          backgroundColor: colors.dark100,
        }),
        dropdownIndicator: (baseStyles) => ({
          ...baseStyles,
          padding: 0,
          paddingRight: "6px",
          color: colors.dark30,
        }),
        indicatorsContainer: (baseStyles) => ({
          ...baseStyles,
        }),

        group: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: colors.dark90,
        }),
        option: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: colors.dark90,
          color: colors.light,
          textAlign: "left",
          "&:hover": {
            backgroundColor: colors.dark70,
          },
        }),
      }}
    />
  );
});

export default CSelect;
