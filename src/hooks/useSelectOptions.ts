import { useFetchRawData } from "./useFetchRawData";
import { useCallback, useEffect, useState } from "react";
import { SelectOption } from "../interfaces/SelectOption";

export const useSelectOptions = <T extends unknown>(endpoint: string) => {
  const { rawData: dropdownData } = useFetchRawData<T[]>(endpoint);
  const [dropdownOptions, setDropdownOptions] = useState<SelectOption[]>();

  const mapIntoLabelValue = useCallback(() => {
    if (dropdownData) {
      const newOptions = dropdownData.map((element) => (
        { key: element as string, value: element as string }
      ));
      setDropdownOptions(newOptions);
    }
  }, [dropdownData, setDropdownOptions]);

  useEffect(() => {
    mapIntoLabelValue();
  }, [mapIntoLabelValue]);

  return dropdownOptions;
};
