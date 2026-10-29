'use client';

import type { CSSProperties } from 'react';
import { inkOf, normalizeHex } from '@/lib/color';
import { useI18n } from '@/lib/locale';
import type { ColorOption } from '@/types/uniform';
import { CheckIcon } from './icons';

interface Props {
  colors: ColorOption[];
  value: string;
  onChange: (hex: string) => void;
  /** Màu của mẫu — tách thành nhóm riêng, các màu còn lại để xem trước */
  designColor?: string;
}

const swatchStyle = (hex: string) => ({ '--c': hex, '--ink': inkOf(hex) }) as CSSProperties;

export function ColorSwatches({ colors, value, onChange, designColor }: Props) {
  const { t, tx } = useI18n();
  const isPreset = colors.some((c) => c.hex === value);
  const own = colors.filter((c) => c.hex === designColor);
  const others = colors.filter((c) => c.hex !== designColor);

  const swatch = (c: ColorOption) => {
    const active = c.hex === value;
    return (
      <button
        key={c.hex}
        type="button"
        role="radio"
        aria-checked={active}
        aria-label={tx(c.name)}
        title={tx(c.name)}
        className={`swatch${active ? ' is-active' : ''}`}
        style={swatchStyle(c.hex)}
        onClick={() => onChange(c.hex)}
      >
        <span className="swatch-dot" />
        <span className="swatch-check"><CheckIcon /></span>
      </button>
    );
  };

  const custom = (
    <label
      className={`swatch swatch--custom${isPreset ? '' : ' is-active'}`}
      title={t.customColor}
      style={isPreset ? undefined : swatchStyle(value)}
    >
      <input
        type="color"
        aria-label={t.chooseCustomColor}
        value={value.toLowerCase()}
        onChange={(e) => {
          const hex = normalizeHex(e.target.value);
          if (hex) onChange(hex);
        }}
      />
      <span className="swatch-dot" />
      <span className="swatch-check"><CheckIcon /></span>
    </label>
  );

  if (!own.length) {
    return (
      <div className="swatches" role="radiogroup" aria-label={t.shirtColor}>
        {colors.map(swatch)}
        {custom}
      </div>
    );
  }

  return (
    <div className="swatches swatches--grouped" role="radiogroup" aria-label={t.shirtColor}>
      <div className="swatch-group swatch-group--design" role="group" aria-label={t.designColors}>
        <span className="swatch-group-label">{t.designColors}</span>
        <div className="swatch-row">{own.map(swatch)}</div>
      </div>
      <div className="swatch-group" role="group" aria-label={t.previewOtherColors}>
        <span className="swatch-group-label">{t.previewOtherColors}</span>
        <div className="swatch-row">
          {others.map(swatch)}
          {custom}
        </div>
      </div>
    </div>
  );
}

export function ColorCurrent({ colors, value, designColor }: { colors: ColorOption[]; value: string; designColor?: string }) {
  const { t, tx } = useI18n();
  const preset = colors.find((c) => c.hex === value);
  return (
    <span className="color-current glass glass--refract">
      <i />
      <span>{preset ? tx(preset.name) : t.custom}</span>
      {designColor && (
        <small className={`color-kind${value === designColor ? ' is-design' : ''}`}>
          {value === designColor ? t.designColor : t.preview}
        </small>
      )}
      <code>{value}</code>
    </span>
  );
}
