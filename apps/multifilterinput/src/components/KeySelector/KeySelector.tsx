import { Combobox, type ComboboxProps, type Option } from "@components/Combobox";
import type { Key } from "@lib/types";
import { type FC, useMemo } from "react";

type Props = Pick<ComboboxProps, "autoFocus" | "disabled" | "className"> & {
  keys: Key[];
  onChange: (option: Option) => void;
  selectedId?: string;
};

export const KeySelector: FC<Props> = ({ keys, selectedId, ...props }) => {
  const selectedOption = useMemo(() => {
    const key = keys.find((key) => key.id === selectedId);
    return key ? { id: key.id, value: key.name } : undefined;
  }, [keys, selectedId]);

  return (
    <Combobox
      {...props}
      label="Filter key"
      placeholder="Add a filter..."
      options={keys.map((key) => ({ id: key.id, value: key.name }))}
      selectedOptions={selectedOption}
    />
  );
};
