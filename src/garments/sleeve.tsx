import { Garment, type GarmentProps } from './Garment';

const CUFF = 'M52,352 Q200,384 348,352 L352,380 Q200,412 48,380 Z';

/** Tay áo / vai nhìn nghiêng — vùng in họa tiết quanh (200, 220) */
export function Sleeve(props: GarmentProps) {
  return (
    <Garment
      {...props}
      body="M80,140 C95,60 305,60 320,140 L352,380 Q200,412 48,380 Z"
      ground={{ cx: 200, cy: 425, rx: 150, ry: 9 }}
      folds={
        <>
          <path d="M150,150 C140,240 146,300 130,380" stroke="#fff" strokeOpacity=".14" strokeWidth="22" />
          <path d="M262,150 C270,240 268,300 284,380" stroke="#000" strokeOpacity=".12" strokeWidth="18" />
        </>
      }
      details={
        <>
          <path className="g-fill" d={CUFF} />
          <path d={CUFF} fill="#000" fillOpacity=".10" />
        </>
      }
      seams={
        <>
          <path className="g-line" d="M90,150 C108,84 292,84 310,150" />
          <path className="g-stitch" d="M94,158 C112,94 288,94 306,158" />
          <path className="g-line" d="M52,352 Q200,384 348,352" />
          <path className="g-stitch" d="M50,370 Q200,402 350,370" />
        </>
      }
    />
  );
}
