'use client';

import type { CSSProperties } from 'react';
import { inkOf, normalizeHex } from '@/lib/color';
import type { ColorOption } from '@/types/uniform';
import { CheckIcon } from './icons';

interface Props {
  colors: ColorOption[];
  value: string;
  onChange: (hex: string) => void;
}

const swatchStyle = (hex: string) => ({ '--c': hex, '--ink': inkOf(hex) }) as CSSProperties;

export function ColorSwatches({ colors, value, onChange }: Props) {
  const isPreset = colors.some((c) => c.hex === value);

  return (
    <div className="swatches" role="radiogroup" aria-label="Màu áo">
      {colors.map((c) => {
        const active = c.hex === value;
        return (
          <button
            key={c.hex}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={c.name}
            title={c.name}
            className={`swatch${active ? ' is-active' : ''}`}
            style={swatchStyle(c.hex)}
            onClick={() => onChange(c.hex)}
          >
            <span className="swatch-dot" />
            <span className="swatch-check"><CheckIcon /></span>
          </button>
        );
      })}
      <label
        className={`swatch swatch--custom${isPreset ? '' : ' is-active'}`}
        title="Màu tùy chỉnh"
        style={isPreset ? undefined : swatchStyle(value)}
      >
        <input
          type="color"
          aria-label="Chọn màu tùy chỉnh"
          value={value.toLowerCase()}
          onChange={(e) => {
            const hex = normalizeHex(e.target.value);
            if (hex) onChange(hex);
          }}
        />
        <span className="swatch-dot" />
        <span className="swatch-check"><CheckIcon /></span>
      </label>
    </div>
  );
}

export function ColorCurrent({ colors, value }: { colors: ColorOption[]; value: string }) {
  const preset = colors.find((c) => c.hex === value);
  return (
    <span className="color-current glass glass--refract">
      <i />
      <span>{preset ? preset.name : 'Tùy chỉnh'}</span>
      <code>{value}</code>
    </span>
  );
}
