import style from './styles.scss';

const ProgressBar = ({
  progress,
}) => {

  return (
    <div className={style.progress}>
      <div className={style.label}>{parseInt(progress)}%</div>
		  <div className={style.progressBarBlue} style={{width: `${progress}%`}}>
      </div>
    </div>
  );
};

export default ProgressBar;
