import clsx from 'clsx';

interface Props {
  children: any;
  className?: string;
  style? : object;
  onClick? : () => void
}

const Button : React.FC<Props> = ({ children, style, className, ...otherProps }) =>{
  const classNames = clsx('asd', `${className}`);
  return (
    <button 
      style={style} 
      className={classNames}
      {...otherProps} 
    >
      {children}
    </button>
  );
};

export default Button;
