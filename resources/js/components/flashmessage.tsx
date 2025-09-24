import Marquee from "react-fast-marquee";

export default function FlashMessage() {
  return (
    <div className="bg-black text-white py-2 z-20">
        <Marquee speed={50} gradient={false} className="font-noto-sans-jp">
            <span className="inline-block pr-10 text-[14px]">
                SUMMER SCORCH COLLECTION OUT NOW!!!{' '}
            </span>
            <span className="inline-block pr-10 text-[14px]">
                SUMMER SCORCH COLLECTION OUT NOW!!!{' '}
            </span>
            <span className="inline-block pr-10 text-[14px]">
                SUMMER SCORCH COLLECTION OUT NOW!!!{' '}
            </span>
            <span className="inline-block pr-10 text-[14px]">
                SUMMER SCORCH COLLECTION OUT NOW!!!{' '}
            </span>
        
        </Marquee>
    </div>
  );

};

