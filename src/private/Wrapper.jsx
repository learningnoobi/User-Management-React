import Menu from '../components/Menu'
import Nav from '../components/Nav'

const Wrapper = (props) => {
    return (
        <>
            <Nav />

            <div className="container-fluid">
                <div className="row">
                    <Menu />

                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default Wrapper
