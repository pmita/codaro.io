// NEXT
import Image from 'next/image'

export const AnimatedBox = () => {
  return (
    <div className="w-[100px] h-[100px] bg-muted relative isolate overflow-hidden">
      <Image
        src="/images/svg/big-eclipse.svg"
        alt="green-eclipse"
        width={100}
        height={100}
        className="z-10 blur-lg transform-gpu absolute top-[20px] right-[-20px] animate-wiggleUp"
      />
      <Image
        src="/images/svg/small-eclipse.svg"
        alt="green-eclipse"
        width={75}
        height={75}
        className="blur-lg transform-gpu absolute top-[0px] left-[-5px] animate-wiggleUp"
      />
    </div>
  )
}
