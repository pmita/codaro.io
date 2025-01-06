import { Check } from "lucide-react"
import { PRIMARY_COLOR } from "@/lib/constants"
import styles from './styles.module.css';

export const Bonuses = ({ bonuses }: { bonuses: string[] }) => {
  if (!bonuses?.length) return null;

  return (
    <ul className={styles.container}>
      {bonuses.map((bonus) => (
        <li className={styles.item} key={bonus}>
          <Check fill={PRIMARY_COLOR} width={15} height={15} />
          {bonus}
        </li>
      ))}
    </ul>
  )
}