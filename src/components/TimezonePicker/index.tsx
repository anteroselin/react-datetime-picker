import { FC } from "react";
import moment from "moment-timezone";

import CSelect from "components/CSelect";

import { SelectableItem } from "types/select.types";
import { TimezonePickerProps } from "types/timezonepicker.types";

const TimezonePicker: FC<TimezonePickerProps> = ({ selectedTimezone, onSelect }) => {
  const timezones = moment.tz.names().map((timezone) => ({
    value: timezone,
    label: `${timezone} ${moment().tz(timezone).format("Z")}`,
  }));

  const handleTimezoneChanged = (selectedTimezone: SelectableItem) => {
    if (onSelect) {
      onSelect(selectedTimezone.value);
    }
  };

  return (
    <div data-testid="timezone-picker">
      <CSelect
        isSearchable={true}
        options={timezones}
        defaultOption={[
          {
            label: `${selectedTimezone || moment.tz.guess()} ${moment()
              .tz(selectedTimezone || moment.tz.guess())
              .format("Z")}`,
            value: selectedTimezone || moment.tz.guess(),
          },
        ]}
        onSelected={handleTimezoneChanged}
        placeholder="Select a timezone"
      />
    </div>
  );
};

export default TimezonePicker;
