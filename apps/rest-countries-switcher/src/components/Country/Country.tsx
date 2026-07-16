import type { Country as CountryType } from "@api/types";
import { Flag } from "@components/Flag";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type FC,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  useCallback,
  useRef,
} from "react";

type Props = HTMLAttributes<HTMLElement> &
  Required<Pick<CountryType, "name" | "id" | "population" | "region" | "capital" | "flag">> & {};

export const Country: FC<Props> = ({ capital, className, flag, id, name, population, region }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
      // link already handles this, we don't need to duplicate the event
      if (event.target === linkRef.current) {
        return;
      }

      // makes the entire card clickable without intefering with inner text selection and accessibility
      const route = linkRef.current?.getAttribute("href");

      if (typeof route === "string") {
        router.push(route);
      }
    },
    [router],
  );

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: will refactor later
    <div
      className={clsx(
        "container-shadow relative overflow-hidden cursor-pointer hover:scale-[1.01] focus-within:scale-[1.01]",
        className,
      )}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick(e);
        }
      }}
    >
      <Flag {...flag} />
      <div className="p-5">
        <h3>
          <Link
            ref={linkRef}
            href={`/country/${id}`}
            className="inline-block text-base font-bold mb-3"
          >
            {name}
          </Link>
        </h3>
        <ul>
          <li className="leading-[1.75]">
            <strong className="font-semibold">Population</strong>:{" "}
            {new Intl.NumberFormat().format(population)}
          </li>
          <li className="leading-[1.75]">
            <strong className="font-semibold">Region</strong>: {region}
          </li>
          <li className="leading-[1.75]">
            <strong className="font-semibold">Capital</strong>: {capital}
          </li>
        </ul>
      </div>
    </div>
  );
};
