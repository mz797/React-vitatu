import Card from "./Card";
import classes from "./DeleteBox.module.css";
type MyProps = {
	onConfirm: () => void;
	onCancel: () => void;
};
const DeleteBox = (props: MyProps) => {
	return (
		<div className={classes.box}>
			<div className={classes.content}>
				<Card>
					<>
						<h3>Jesteś pewnien?</h3>
						<p>Zmiany są nieodwracalne</p>
						<div className={classes.btns}>
							<button onClick={props.onConfirm}>Usuń</button>
							<button onClick={props.onCancel}>Anuluj</button>
						</div>
					</>
				</Card>
			</div>
		</div>
	);
};
export default DeleteBox;
