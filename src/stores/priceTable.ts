import { atom } from 'jotai';
import { priceList } from '@/data/priceList';


export const priceTableAtom = atom<PriceInfo[]>(priceList);
