export type HouseId = number & { readonly type: unique symbol };
export const toHouseId = (value: number) => value as HouseId;
export const EMPTY_HOUSE_ID = toHouseId(0);

export type Material = 'STRAW' | 'WOOD' | 'BRICKS';

export type Pig = 'NOT_LAZY' | 'NOT_LAZY_ANYMORE' | 'VERY_LAZY' | 'LAZY';

export type Pigs3 = [Pig, Pig, Pig] | [Pig, Pig] | [Pig] | [];
