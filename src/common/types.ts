export type FunctionComponent = React.ReactElement | null;

type HeroIconSVGProps = React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> &
  React.RefAttributes<SVGSVGElement>;
type IconProps = HeroIconSVGProps & {
  title?: string;
  titleId?: string;
};
export type Heroicon = React.FC<IconProps>;

export type CardBrand = "visa" | "mastercard" | "amex";

export interface Card {
  id: string;
  brand: CardBrand;
  last4: string;
  isDefault: boolean;
}
