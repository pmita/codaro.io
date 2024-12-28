export interface INavigationItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: React.ReactNode;
}