import Header from "../components/navigation/Header";
import Footer from "../components/navigation/Footer";

function Layout(props){
    return(
        <div>
            <Header />
            {props.children}
            <Footer />
        </div>
    )
}

export default Layout;