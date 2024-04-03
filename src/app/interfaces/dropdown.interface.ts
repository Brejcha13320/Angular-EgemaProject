import { ClaseColor } from './clase-color.interface';

export interface Dropdown {
  title?: string;
  clase: ClaseColor;
  options: OptionsDropdown[];
}

interface OptionsDropdown {
  idButton: string;
  text: string;
  icon?: string;
  textColor: ClaseColor;
}
