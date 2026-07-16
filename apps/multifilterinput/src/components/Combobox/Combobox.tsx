import { Chip } from "@components/Chip";
import {
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Combobox as HeadlessCombobox,
  type ComboboxProps as HeadlessComboboxProps,
} from "@headlessui/react";
import clsx from "clsx";
import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface Option<T = string> {
  id: T;
  value: string | number;
}

type ComboboxProps<T = string> = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "placeholder" | "autoFocus" | "onKeyDown"
> & {
  className?: string;
  label: string;
  options: Option<T>[];
  // onChange: (option: Option | Option[]) => void;
  onBackspace?: () => void;
  onRemoveOption?: (option: Option) => void;
  // selectedOptions?: Option<T> | Option<T>[];
};

type SingleProps<T = string> = Omit<
  HeadlessComboboxProps<Option, false>,
  "by" | "virtual" | "onChange" | "multiple"
> &
  ComboboxProps<T> & {
    multiple?: false;
    onChange: (option: Option) => void;
    selectedOptions?: Option<T>;
  };

type MultiProps<T = string> = Omit<
  HeadlessComboboxProps<Option[], true>,
  "by" | "virtual" | "onChange" | "multiple"
> &
  ComboboxProps<T> & {
    multiple: true;
    onChange: (option: Option[]) => void;
    selectedOptions?: Option<T>[];
  };

type Props<T = string> = SingleProps<T> | MultiProps<T>;

function isNonNullArray<T>(value: T[] | null[]): value is T[] {
  return value.every((v) => v !== null);
}

function isSingleOnChange(
  _onChange: Props["onChange"],
  multiple: boolean,
  value: Option | Option[],
): _onChange is SingleProps["onChange"] {
  return !multiple && !Array.isArray(value);
}

function isMultipleOnChange(
  _onChange: Props["onChange"],
  multiple: boolean,
  value: Option | Option[],
): _onChange is MultiProps["onChange"] {
  return multiple && Array.isArray(value);
}

export const Combobox = ({
  autoFocus,
  className,
  label,
  multiple = false,
  placeholder,
  options,
  selectedOptions,
  onChange,
  onBackspace,
  onRemoveOption,
  ...props
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(
    !Array.isArray(selectedOptions) ? (selectedOptions?.value.toString() ?? "") : "",
  );
  const [isStatic, setStatic] = useState(autoFocus ?? false);

  const handleChange = useCallback(
    (value: Option | Option[] | null | null[]) => {
      if (multiple) setQuery("");

      if (!value || (Array.isArray(value) && !isNonNullArray(value))) {
        return;
      }

      if (isSingleOnChange(onChange, multiple, value) && !Array.isArray(value)) {
        onChange(value);
        return;
      }

      if (isMultipleOnChange(onChange, multiple, value) && Array.isArray(value)) {
        onChange(value);
      }
    },
    [onChange, multiple],
  );

  const handleRemoveOption = useCallback(
    (option: Option) => () => {
      if (onRemoveOption !== undefined) {
        onRemoveOption(option);
      }
    },
    [onRemoveOption],
  );

  const handleClose = useCallback(() => {
    setQuery("");
  }, []);

  const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (isStatic === true) {
        setStatic(false);
      }

      if (event.key === "Backspace" && query === "") {
        if (
          multiple &&
          Array.isArray(selectedOptions) &&
          selectedOptions.length > 0 &&
          onRemoveOption !== undefined
        ) {
          onRemoveOption(selectedOptions[selectedOptions.length - 1]);
          return;
        }

        if (onBackspace !== undefined) {
          onBackspace();
        }
      }

      if (
        event.key === "Enter" &&
        isStatic &&
        selectedOptions !== undefined &&
        !Array.isArray(selectedOptions) &&
        isSingleOnChange(onChange, multiple, selectedOptions)
      ) {
        onChange(selectedOptions);
      }
    },
    [onBackspace, onRemoveOption, query, isStatic, multiple, selectedOptions, onChange],
  );

  const filteredOptions = useMemo(
    () =>
      query === ""
        ? options
        : options?.filter((option) => {
            return typeof option.value === "string"
              ? option.value.toLowerCase().includes(query.toLowerCase())
              : option.value.toString().includes(query.toLowerCase());
          }),
    [query, options],
  );

  useEffect(() => {
    const handleClickEvent = (e: MouseEvent) => {
      // when clicking outside the input, set static to false
      if (e.target !== inputRef.current) {
        setStatic(false);
      }
    };

    if (isStatic) {
      window.addEventListener("click", handleClickEvent);
    } else {
      window.removeEventListener("click", handleClickEvent);
    }

    return () => {
      window.removeEventListener("click", handleClickEvent);
    };
  }, [isStatic]);

  return (
    <HeadlessCombobox
      {...props}
      multiple={multiple}
      immediate
      value={selectedOptions ?? (multiple ? [] : null)}
      onChange={handleChange}
      onClose={handleClose}
    >
      <div>
        <div className="flex items-center gap-1">
          {multiple &&
            Array.isArray(selectedOptions) &&
            selectedOptions.map((option) => (
              <Chip key={option.id} onRemove={handleRemoveOption(option)}>
                {option.value}
              </Chip>
            ))}
          <ComboboxInput
            ref={inputRef}
            aria-label={label}
            autoFocus={autoFocus}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={clsx("disabled:bg-gray-100 outline-hidden", className)}
            value={query}
          />
        </div>

        <ComboboxOptions
          anchor={{ to: "bottom start", gap: 8, offset: -2 }}
          className="rounded-sm bg-white border border-gray-200 empty:invisible z-10"
          // when using autoFocus, the options do not appear even though the input is focused.
          // setting static to true, but only for the initial render, addresses this.
          static={isStatic}
        >
          {filteredOptions?.map((option) => (
            <ComboboxOption
              key={option.id}
              value={option}
              className="flex gap-1.5 items-center data-selected:bg-blue-100 data-focus:bg-blue-200 data-focus:data-selected:bg-blue-200 py-2 px-4"
            >
              {option.value}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </div>
    </HeadlessCombobox>
  );
};
