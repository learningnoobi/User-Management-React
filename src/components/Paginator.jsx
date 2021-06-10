
const Paginator = ({ next, prev }) => {

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <button onClick={prev} className="btns back mx-1 page-link">Previous</button>
                </li>
                <li className="page-item">
                    <button onClick={next} className="btns back page-link">Next</button>
                </li>
            </ul>
        </nav>
    )
}

export default Paginator
