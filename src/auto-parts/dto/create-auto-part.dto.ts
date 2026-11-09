import type { PartCondition } from '../auto-part.entity.js';

export class CreateAutoPartDto {
  title!: string;
  price!: number;
  oemCode!: string;
  condition!: PartCondition;
  carBrand!: string;
}
