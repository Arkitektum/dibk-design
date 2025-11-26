// LoadingAnimation2.tsx

import style from "./LoadingAnimation2.module.scss";

export interface LoadingAnimation2Props {
  ariaLabel?: string;
}

const LoadingAnimation2 = ({
  ariaLabel = "Laster inn",
}: LoadingAnimation2Props) => {
  const delays = [0, 0.15, 0.3];

  return (
    <div role="img" aria-label={ariaLabel} className={style.LoadingAnimation2}>
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

export default LoadingAnimation2;
