
import classes from './Row.css';

const Row = (props) => {
    return (
        <div className="row">
            {props.children}
        </div>
    );
};
export default Row;
