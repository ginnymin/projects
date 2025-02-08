import clsx from "clsx";
import { HTMLAttributes, useCallback, useState, type FC } from "react";

import { Filter, type FilterProps } from "@components/Filter";
import type { OperatorDefinition, Filter as FilterType, Key } from "@lib/types";
import { Chip } from "@components/Chip";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  keys: Key[];
  operators?: OperatorDefinition[];
  onChange: (filters: FilterType[]) => void;
}

type FilterWithId = FilterType & {
  id: string;
};

const addIdToFilter = (filter: FilterType): FilterWithId => {
  const timestamp = new Date().getTime();
  const value =
    "value" in filter
      ? Array.isArray(filter.value)
        ? filter.value.join(", ")
        : filter.value.toString()
      : undefined;
  return value !== undefined
    ? {
        ...filter,
        id: `${filter.key}-${filter.operator}-${value}-${timestamp}`,
      }
    : { ...filter, id: `${filter.key}-${filter.operator}-${timestamp}` };
};

/**
 * A component that allows the user to add and remove filters.
 *
 * @param {object} props
 * @param {Key[]} props.keys - An array of filter keys that determines the available types of filters.
 * @param {function} props.onChange - A function that is called when the user adds or changes the filters.
 */
export const MultiFilterInput: FC<Props> = ({
  autoFocus,
  className,
  keys,
  operators,
  onChange,
  ...props
}) => {
  const [filters, setFilters] = useState<FilterWithId[]>([]);
  const [editFilterId, setEditFilterId] = useState<
    FilterWithId["id"] | undefined
  >();

  const handleChange = useCallback(
    (filters: FilterWithId[]) => {
      const sanitizedFilters = filters.map((filter) =>
        "value" in filter
          ? {
              key: filter.key,
              operator: filter.operator,
              value: filter.value,
            }
          : {
              key: filter.key,
              operator: filter.operator,
            }
      );

      setFilters(filters);
      onChange(sanitizedFilters);
    },
    [onChange]
  );

  const addFilter: FilterProps["onSelect"] = useCallback(
    (filter) => {
      const newFilters = [...filters, addIdToFilter(filter)];
      handleChange(newFilters);
    },
    [filters, handleChange]
  );

  const setEditFilter = useCallback(
    (id: FilterWithId["id"]) => () => {
      setEditFilterId(id);
    },
    []
  );

  const editFilter = useCallback(
    (id: FilterWithId["id"]) => (filter: FilterType) => {
      const newFilters = filters.map((f) => {
        if (f.id === id) {
          return addIdToFilter(filter);
        }

        return f;
      });
      handleChange(newFilters);
    },
    [filters, handleChange]
  );

  const removeFilter = useCallback(
    (id: FilterWithId["id"]) => () => {
      const newFilters = filters.filter((f) => f.id !== id);
      handleChange(newFilters);
    },
    [filters, handleChange]
  );

  return (
    <div
      {...props}
      className={clsx(
        "flex flex-wrap items-baseline gap-2 border border-gray-300 rounded px-3 py-2 element-focus-within bg-white",
        className
      )}
    >
      {filters.map((filter) => {
        if (editFilterId === filter.id) {
          return (
            <Filter
              key={`${filter.id}`}
              keys={keys}
              operators={operators}
              onSelect={editFilter(filter.id)}
              defaultFilter={filter}
            />
          );
        }

        const key = keys.find((key) => key.id === filter.key);

        return (
          <Chip
            key={`${filter.id}`}
            onSelect={setEditFilter(filter.id)}
            onRemove={removeFilter(filter.id)}
          >
            {key?.name ?? filter.key} {filter.operator}{" "}
            {"value" in filter
              ? Array.isArray(filter.value)
                ? filter.value.join(", ")
                : filter.value.toString()
              : null}
          </Chip>
        );
      })}

      <Filter
        keys={keys}
        operators={operators}
        onSelect={addFilter}
        autoFocus={autoFocus === true || filters.length > 0}
      />
    </div>
  );
};
