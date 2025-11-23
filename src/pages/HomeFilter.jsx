import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {FaPaperPlane} from 'react-icons/fa';

const HomeFilter = () => {



    return (
        <>
        <div className="container">
            <Navbar />
            <div className="hero">
                <div className="part1">
                    <h6>Lorem ipsum dolor sit.</h6>
                    <h3><FaPaperPlane /></h3>
                </div>
                <div className="part2"> </div>
            </div>
            <Footer />
        </div>
        </>
    )
}