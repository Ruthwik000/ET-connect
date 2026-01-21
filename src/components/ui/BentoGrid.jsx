import { cn } from "../../utils/cn";

const BentoGrid = ({ children, className }) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[18rem] sm:auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl cursor-pointer",
      // Dark theme styles
      "bg-white/5 backdrop-blur-sm",
      "ring-1 ring-white/10",
      "hover:ring-white/20",
      "transform-gpu transition-all duration-300",
      className
    )}
  >
    <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100">
      {background}
    </div>
    
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-4 sm:p-6 transition-all duration-300">
      <Icon className="h-10 w-10 sm:h-12 sm:w-12 origin-left transform-gpu text-white/80 transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="text-lg sm:text-xl font-semibold text-white mt-1 sm:mt-2">{name}</h3>
      <p className="max-w-lg text-white/70 text-xs sm:text-sm leading-snug">{description}</p>
    </div>

    <div className="pointer-events-none absolute inset-0 bg-neutral-950/60 transform-gpu transition-all duration-500 group-hover:bg-neutral-950/20" />
  </div>
);

export { BentoCard, BentoGrid };
