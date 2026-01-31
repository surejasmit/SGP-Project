import * as React from "react";
import { cn } from "@/lib/utils";

interface ExpandableCardProps {
  title: string;
  src: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export function ExpandableCard({
  title,
  src,
  description,
  children,
  className,
  ...props
}: ExpandableCardProps) {
  const [active, setActive] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(false);
      }
    };

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    };

    if (active) {
      window.addEventListener("keydown", onKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [active]);

  return (
    <>
      {active && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-md h-full w-full z-10" />
          <div className="fixed inset-0 grid place-items-center z-[100] sm:mt-16">
            <div
              ref={cardRef}
              className="w-full max-w-[850px] h-full flex flex-col overflow-auto bg-gray-800 shadow-lg rounded-t-3xl relative border border-gray-700"
              {...props}
            >
              <div className="relative">
                <img
                  src={src}
                  alt={title}
                  className="w-full h-80 object-cover object-center"
                />
              </div>
              <div className="relative h-full">
                <div className="flex justify-between items-start p-8 h-auto">
                  <div>
                    <p className="text-gray-400 text-lg">{description}</p>
                    <h3 className="font-semibold text-white text-4xl mt-0.5">{title}</h3>
                  </div>
                  <button
                    aria-label="Close card"
                    className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 border border-gray-600 transition-colors"
                    onClick={() => setActive(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="relative px-6 sm:px-8">
                  <div className="text-gray-300 text-base pb-10 flex flex-col items-start gap-4">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div
        onClick={() => setActive(true)}
        className={cn(
          "p-3 flex flex-col justify-between items-center bg-gray-800 shadow-lg rounded-2xl cursor-pointer border border-gray-700 hover:border-gray-600 transition-colors",
          className,
        )}
      >
        <div className="flex gap-4 flex-col w-full">
          <img
            src={src}
            alt={title}
            className="w-full h-56 rounded-lg object-cover object-center"
          />
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <p className="text-gray-400 text-sm font-medium">{description}</p>
              <h3 className="text-white font-semibold">{title}</h3>
            </div>
            <button
              aria-label="Open card"
              className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600 border border-gray-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5v14" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
