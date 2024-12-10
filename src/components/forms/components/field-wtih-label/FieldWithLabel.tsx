import type { JSX } from "react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ComponentTypeMap, IFieldWithLabel} from "./types"
import { cn } from "@/lib/utils"
import styles from './styles.module.css';

const ComponentType: ComponentTypeMap = {
  input: Input,
  textarea: Textarea,
}


export const FieldWithLabel = ({
  name,
  label,
  register,
  validationSchema,
  type,
  placeholder,
  error,
  className,
  componentType,
  ...rest
}: IFieldWithLabel): JSX.Element => {
  const Component = ComponentType[componentType as keyof ComponentTypeMap] || ComponentType.input;
  
  return (
    <div className={cn(styles.section, className)}>
    {label ? (
      <Label htmlFor={name}>{label}</Label>
    ) : null}

    <Component
      className={styles.input}
      id={name}
      placeholder={placeholder}
      type={type}
      {...register(name, validationSchema)}
      {...rest}
    />

    {error && (
      <span className={styles.error}>{error}</span>
    )}
  </div>
  )
}