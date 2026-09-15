/**
 * Wavy bottom design element to add stylish curves at the bottom of hero sections.
 * Creates a flowing, organic transition from the image to the content below.
 * Features multiple wave layers for depth and visual interest.
 */
export function WavyBottom({
    className = "",
    color = "#ffffff"
}: {
    className?: string;
    color?: string;
}) {
    return (
        <div className={`absolute bottom-0 left-0 right-0 ${className}`}>
            <svg
                viewBox="0 -20 1200 120"
                className="w-full h-auto"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Multiple wave layers for depth */}
                <path
                    d="M0,80 C200,120 400,40 600,80 C800,120 1000,40 1200,80 L1200,120 L0,120 Z"
                    fill={color}
                    fillOpacity="0.8"
                />
                <path
                    d="M0,90 C150,130 350,50 500,90 C650,130 850,50 1000,90 C1100,110 1150,100 1200,90 L1200,120 L0,120 Z"
                    fill={color}
                    fillOpacity="0.9"
                />
                <path
                    d="M0,100 C300,140 600,60 900,100 C1050,120 1150,90 1200,100 L1200,120 L0,120 Z"
                    fill={color}
                />
            </svg>
        </div>
    );
}