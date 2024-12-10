import { UseFormRegister } from "react-hook-form";

export type ComponentTypeMap = Record<string, React.ElementType>;

export interface IFieldWithLabel {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  validationSchema?: {
    required?: string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
  }
  componentType?: string;
  error?: string; 
  className?: string;
}