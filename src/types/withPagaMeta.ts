import { PageMeta } from '../core/models/pagemeta.type';

export type WithPageMeta<T> = T & { meta: PageMeta };
