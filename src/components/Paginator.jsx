
const Paginator = ({ next, prev }) => {

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <button onClick={prev} className="page-link">Previous</button>
                </li>
                <li className="page-item">
                    <button onClick={next} className="page-link">Next</button>
                </li>
            </ul>
        </nav>
    )
}

export default Paginator
