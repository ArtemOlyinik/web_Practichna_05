import {
  Injectable,
  Logger,
  NotFoundException,
  type OnModuleInit,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { SlugService } from '../shared/slug.service.js';
import type { AutoPart } from './auto-part.entity.js';
import type { CreateAutoPartDto } from './dto/create-auto-part.dto.js';
import type { UpdateAutoPartDto } from './dto/update-auto-part.dto.js';

@Injectable()
export class AutoPartsService implements OnModuleInit {
  private readonly logger = new Logger(AutoPartsService.name);

  private items: AutoPart[] = [
    {
      id: '1',
      title: 'Гальмівні колодки Brembo P85020',
      price: 2450,
      oemCode: 'P85020',
      condition: 'new',
      carBrand: 'Volkswagen',
      slug: 'halmivni-kolodky-brembo-p85020',
    },
    {
      id: '2',
      title: 'Амортизатор KYB Excel-G 333504',
      price: 1890,
      oemCode: '333504',
      condition: 'new',
      carBrand: 'Volkswagen',
      slug: 'amortyzator-kyb-excel-g-333504',
    },
    {
      id: '3',
      title: 'Стартер Bosch 0001108231',
      price: 3200,
      oemCode: '0001108231',
      condition: 'refurbished',
      carBrand: 'Audi',
      slug: 'starter-bosch-0001108231',
    },
  ];

  constructor(private readonly slugService: SlugService) {}

  onModuleInit(): void {
    this.logger.log(
      'Ініціалізація модуля завершена. Завантажено початкові тестові дані.',
    );

    const initialItems: Array<Omit<AutoPart, 'id' | 'slug'>> = [
      {
        title: 'Повітряний фільтр MANN C25114',
        price: 650,
        oemCode: 'C25114',
        condition: 'new',
        carBrand: 'Volkswagen',
      },
      {
        title: 'Свічка запалювання NGK BKR6E',
        price: 280,
        oemCode: 'BKR6E',
        condition: 'new',
        carBrand: 'Audi',
      },
    ];

    for (const item of initialItems) {
      this.items.push({
        id: randomUUID(),
        slug: this.slugService.generateSlug(item.title),
        ...item,
      });
    }
  }

  findAll(search?: string, limit?: number): AutoPart[] {
    let result = this.items;

    if (search) {
      const query = search.toLowerCase();
      result = result.filter((item) =>
        item.title.toLowerCase().includes(query),
      );
    }

    if (limit !== undefined) {
      result = result.slice(0, limit);
    }

    return result;
  }

  findOne(id: string): AutoPart {
    const item = this.items.find((entry) => entry.id === id);
    if (!item) {
      throw new NotFoundException(`Сутність з ID ${id} не знайдена`);
    }
    return item;
  }

  create(dto: CreateAutoPartDto): AutoPart {
    const item: AutoPart = {
      id: randomUUID(),
      ...dto,
      slug: this.slugService.generateSlug(dto.title),
    };
    this.items.push(item);
    return item;
  }

  update(id: string, dto: UpdateAutoPartDto): AutoPart {
    const item = this.findOne(id);
    Object.assign(item, dto);

    if (dto.title) {
      item.slug = this.slugService.generateSlug(dto.title);
    }

    return item;
  }

  remove(id: string): void {
    const index = this.items.findIndex((entry) => entry.id === id);
    if (index === -1) {
      throw new NotFoundException(`Сутність з ID ${id} не знайдена`);
    }
    this.items.splice(index, 1);
  }
}
