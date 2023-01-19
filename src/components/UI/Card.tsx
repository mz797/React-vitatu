import classes from './Card.module.css'

type CardProps = {
	children: JSX.Element;
};
const Card = (props: CardProps) => {
	return <div className={classes.card} >{props.children}</div>;
};
export default Card;
