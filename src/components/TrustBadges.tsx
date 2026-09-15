import Image from "next/image";

/**
 * Three professional trust badges featuring Transportation Included,
 * Safety First Approach, and Specialized Curriculum Options.
 * Uses the official badge design with orange and navy blue styling.
 */
export function TrustBadges({
  className = "",
  tone = "onLight"
}: {
  className?: string;
  tone?: "onLight" | "onDark";
}) {
  return (
    <div className={`flex justify-center sm:justify-start ${className}`}>
      <div className="relative w-full max-w-md">
        <Image
          src="/images/trustbadges.png"
          alt="Trust badges showing Transportation Included, Safety First Approach, and Specialized Curriculum Options"
          width={600}
          height={200}
          className="w-full h-auto drop-shadow-lg"
          sizes="(min-width: 640px) 400px, 300px"
        />
      </div>
    </div>
  );
}
