import { Garment, type GarmentProps } from './Garment';

/* Áo thun cổ tròn — mặt trước & mặt sau dùng chung dáng thân */

const BODY =
  'M165,30 C180,42 220,42 235,30 L305,48 Q352,72 390,118 L350,172 L318,150 ' +
  'C314,240 316,330 322,420 Q200,434 78,420 C84,330 86,240 82,150 L50,172 L10,118 Q48,72 95,48 Z';
const GROUND = { cx: 200, cy: 440, rx: 125, ry: 9 };

const SLEEVE_FOLDS = (
  <>
    <path d="M40,128 C62,138 80,146 96,150" stroke="#000" strokeOpacity=".14" strokeWidth="10" />
    <path d="M360,128 C338,138 320,146 304,150" stroke="#000" strokeOpacity=".14" strokeWidth="10" />
  </>
);

const SEAMS = (
  <>
    <path className="g-line" d="M95,48 Q72,100 82,150" />
    <path className="g-line" d="M305,48 Q328,100 318,150" />
    <path className="g-stitch" d="M18,112 L58,166" />
    <path className="g-stitch" d="M382,112 L342,166" />
    <path className="g-stitch" d="M80,407 Q200,421 320,407" />
  </>
);

const FRONT_NECK = 'M165,30 C180,42 220,42 235,30 C228,78 172,78 165,30 Z';
const FRONT_COLLAR = 'M158,28 C166,90 234,90 242,28 L235,30 C228,78 172,78 165,30 Z';
const BACK_COLLAR = 'M165,30 C180,42 220,42 235,30 L243,33 C224,54 176,54 157,33 Z';

export function TshirtFront(props: GarmentProps) {
  return (
    <Garment
      {...props}
      body={BODY}
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
          <path d="M165,30 C180,42 220,42 235,30 L232,34 C218,50 182,50 168,34 Z" fill="#fff" fillOpacity=".10" />
          {/* bo cổ */}
          <path className="g-fill" d={FRONT_COLLAR} />
          <path d={FRONT_COLLAR} fill="#000" fillOpacity=".10" />
          <path className="g-stitch" d="M161.5,29 C169,84 231,84 238.5,29" />
          <path className="g-line" d="M158,28 C166,90 234,90 242,28" />
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
      body={BODY}
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
          <path className="g-stitch" d="M160,32.5 C178,49 222,49 240,32.5" />
          <path className="g-line" d="M157,33 C176,54 224,54 243,33" />
        </>
      }
      seams={SEAMS}
    />
  );
}
