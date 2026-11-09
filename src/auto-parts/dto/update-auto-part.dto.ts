import type { PartCondition } from '../auto-part.entity.js';

export class UpdateAutoPartDto {
  title?: string;
  price?: number;
  oemCode?: string;
  condition?: PartCondition;
  carBrand?: string;
}
