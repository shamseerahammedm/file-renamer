import clsx from 'clsx';

interface Props {
  children: any;
  className?: string;
  style? : object;
  onClick? : () => void
}

const Button : React.FC<Props> = ({ children, style, className, ...otherProps }) =>{
  return (
    <button 
      style={style} 
      className={clsx('customButton', `${className}`)}
      {...otherProps} 
    >
      {children}
    </button>
  );
};

export default Button;
