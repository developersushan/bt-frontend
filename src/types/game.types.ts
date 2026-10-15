export interface IGame {
  id: number;
  name: string;
  code: string;
  category: string;
  provider_name: string;
  provider_logo: string;
  thumbnail: string;
  image_square: string;
  image_portrait: string;
  image_long: string;
  play_for_fun: boolean;
  has_jackpot: boolean;
  is_featured: boolean;
}