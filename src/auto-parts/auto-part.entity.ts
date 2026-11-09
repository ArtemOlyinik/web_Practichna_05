export type PartCondition = 'new' | 'refurbished';

export interface AutoPart {
  id: string;
  title: string;
  price: number;
  oemCode: string;
  condition: PartCondition;
  carBrand: string;
  slug: string;
}
