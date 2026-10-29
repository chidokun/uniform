import { Garment, type GarmentProps } from './Garment';

/* Áo thun cổ tròn — mặt trước & mặt sau dùng chung dáng thân */

/* Dáng boxy: cổ rộng, vai xuôi, tay ngắn loe, thân suông gần như thẳng, gấu phẳng */
export const TSHIRT_BODY =
  'M147,28 C170,44 230,44 253,28 L310,54 Q321.5,60 328,71 L390,183 L324,226 L322,230 ' +
  'L329,422 Q200,425 71,422 L78,230 L76,226 L10,183 L72,71 Q78.5,60 90,54 Z';
const GROUND = { cx: 200, cy: 436, rx: 140, ry: 9 };

const SLEEVE_FOLDS = (
  <>
    <path d="M28,160 C46,176 62,188 80,196" stroke="#000" strokeOpacity=".14" strokeWidth="10" />
    <path d="M372,160 C354,176 338,188 320,196" stroke="#000" strokeOpacity=".14" strokeWidth="10" />
  </>
);

const SEAMS = (
  <>
    <path className="g-line" d="M86,56 Q72,150 78,230" />
    <path className="g-line" d="M314,56 Q328,150 322,230" />
    <path className="g-stitch" d="M17,178 L76,217" />
    <path className="g-stitch" d="M383,178 L324,217" />
    <path className="g-stitch" d="M73,409 Q200,412 327,409" />
  </>
);

export const FRONT_NECK = 'M147,28 C170,44 230,44 253,28 C244,76 156,76 147,28 Z';
const FRONT_COLLAR = 'M140,26 C150,86 250,86 260,26 L253,28 C244,76 156,76 147,28 Z';
const BACK_COLLAR = 'M147,28 C170,44 230,44 253,28 L261,31 C236,56 164,56 139,31 Z';

export function TshirtFront(props: GarmentProps) {
  return (
    <Garment
      {...props}
      body={TSHIRT_BODY}
      ground={GROUND}
      folds={
        <>
          <path d="M128,190 C146,260 138,320 120,400" stroke="#000" strokeOpacity=".12" strokeWidth="14" />
          <path d="M262,170 C250,250 262,330 280,400" stroke="#fff" strokeOpacity=".16" strokeWidth="16" />
          <path d="M200,110 C196,200 205,300 198,410" stroke="#fff" strokeOpacity=".08" strokeWidth="34" />
          {SLEEVE_FOLDS}
        </>
      }
      details={
        <>
          {/* lòng cổ (thấy mặt trong thân sau) */}
          <path className="g-fill" d={FRONT_NECK} />
          <path d={FRONT_NECK} fill="#000" fillOpacity=".38" />
          <path d="M147,28 C170,44 230,44 253,28 L250,32 C228,52 172,52 150,32 Z" fill="#fff" fillOpacity=".10" />
          {/* bo cổ */}
          <path className="g-fill" d={FRONT_COLLAR} />
          <path d={FRONT_COLLAR} fill="#000" fillOpacity=".10" />
          <path className="g-stitch" d="M143.5,27 C153,81 247,81 256.5,27" />
          <path className="g-line" d="M140,26 C150,86 250,86 260,26" />
        </>
      }
      seams={SEAMS}
    />
  );
}

export function TshirtBack(props: GarmentProps) {
  return (
    <Garment
      {...props}
      body={TSHIRT_BODY}
      ground={GROUND}
      folds={
        <>
          <path d="M272,190 C254,260 262,320 280,400" stroke="#000" strokeOpacity=".12" strokeWidth="14" />
          <path d="M138,170 C150,250 138,330 120,400" stroke="#fff" strokeOpacity=".16" strokeWidth="16" />
          <path d="M200,80 C204,200 195,300 202,410" stroke="#fff" strokeOpacity=".08" strokeWidth="34" />
          {SLEEVE_FOLDS}
        </>
      }
      details={
        <>
          <path className="g-fill" d={BACK_COLLAR} />
          <path d={BACK_COLLAR} fill="#000" fillOpacity=".10" />
          <path className="g-stitch" d="M143,29.5 C167,50 233,50 257,29.5" />
          <path className="g-line" d="M139,31 C164,56 236,56 261,31" />
        </>
      }
      seams={SEAMS}
    />
  );
}
