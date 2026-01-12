// LoadingAnimation.tsx

import style from "./LoadingAnimation.module.scss";

export interface LoadingAnimationProps {
  ariaLabel?: string;
}

const LoadingAnimation = ({
  ariaLabel = "Laster inn",
}: LoadingAnimationProps) => {
  const delays = [0, 0.15, 0.3];

  return (
    <div role="img" aria-label={ariaLabel} className={style.LoadingAnimation}>
      {delays.map((delay) => (
        <span
          key={delay}
          className={style.dot}
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
};

export default LoadingAnimation;
