import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

function Reservations(props) {
    return (
        <ListGroup as="ol">
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Modern Luxury - Barrel Sauna - Hot Tub - Mountains</div>
                    Blue Ridge, Georgia, United States
                    <div className="fst-italic">12/20/22 - 12/27/22</div>
                </div>
                <Badge bg="danger" pill>
                    Cancel Reservation
                </Badge>
            </ListGroup.Item>
        </ListGroup>
    );
}
export default Reservations;
