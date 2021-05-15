import clsx from 'clsx';

interface Props {
  children: any;
  className?: string;
  style? : object;
  onClick? : () => void
}

const buttonStyles = {
  // background: 'rgb(73, 87, 236)',
  // color: 'white'
};

const Button : React.FC<Props> = ({ children, style, className, ...otherProps }) =>{
  const classNames = clsx('asd', `${className}`);
  return (
    <button 
      style={{ ...style, ...buttonStyles }} 
      className={classNames}
      {...otherProps} 
    >
      {/* if icon can be received as an src of image or object ( eg antd icon ) so switching based on that */}
      {/* {
        Icon && (
          typeof Icon !== 'string'
            ?
            <Icon className={`${customiconclass ? customiconclass : `inline-block outline-none ${children && 'mr-2'}`} `} alt="button icon" />
            :
            <img
              src={Icon}
              // if customiconclass prop exists then use that class else use default classes
              className={`${customiconclass ? customiconclass : `w-4 h-4 object-cover inline-block outline-none ${children && 'mr-2'}`} `} alt="button icon"
            />
        )

      } */}
      {children}
    </button>
  );
};

export default Button;
