import './style.css'

const Spinner = ({color}) =>{
    return (<div className="loader">
                <div className="lds-facebook">
                    <div style={{background:color?color:"#34495e"}}></div>
                    <div style={{background:color?color:"#34495e"}}></div>
                    <div style={{background:color?color:"#34495e"}}></div>
                </div>
            </div>);
}
export default Spinner